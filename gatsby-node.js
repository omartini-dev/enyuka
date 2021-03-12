const path = require(`path`);

const { makePropertyPagePath, makePropertyRedirectPath, makeSlug } = require(`./src/components/utils/urlGenerator`);

const {
  sourceAllNodes,
  sourceNodeChanges,
  createSchemaCustomization,
  compileNodeQueries,
  readOrGenerateDefaultFragments,
  buildNodeDefinitions,
  loadSchema,
  createDefaultQueryExecutor,
} = require(`gatsby-graphql-source-toolkit`)
const { print } = require(`gatsby/graphql`)

const fs = require(`fs-extra`)

const PROPERTY_TO_LET_NODE_TYPE = `PropertyToLet`
const PROPERTY_FOR_SALE_NODE_TYPE = `PropertyForSale`

const debugDir = __dirname + `/.cache/d9-compiled-queries`
const fragmentsDir = __dirname + `/d9-fragments`

//Sourcing deltas
const { createApolloFetch } = require('apollo-fetch');

async function writeCompiledQueries(nodeDocs) {
  await fs.ensureDir(debugDir)
  for (const [remoteTypeName, document] of nodeDocs) {
    await fs.writeFile(debugDir + `/${remoteTypeName}.graphql`, print(document))
  }
}

async function createSourcingConfig(gatsbyApi) {
  // Step1. Setup remote schema:
  if (!process.env.GATSBY_GRAPHQL_D9) {
    // throw new Error("Missing process.env.GATSBY_GRAPHQL_D9")
  }
  const execute = createDefaultQueryExecutor(process.env.GATSBY_GRAPHQL_D9)
  const schema = await loadSchema(execute)

  // const nodeInterface = schema.getType(`GatsbyQueryType`)
  // const possibleTypes = schema.getPossibleTypes(nodeInterface)

  const gatsbyNodeTypes = [
    {
      remoteTypeName: PROPERTY_TO_LET_NODE_TYPE,
      queries: `
        query LIST_${PROPERTY_TO_LET_NODE_TYPE}_PAGE1 {
          queryPropertyToLet(input: { property_gmaven_key: "" page: 0 }) {
            ..._${PROPERTY_TO_LET_NODE_TYPE}Id_
          }
        }
        query LIST_${PROPERTY_TO_LET_NODE_TYPE}_PAGE2 {
          queryPropertyToLet(input: { property_gmaven_key: "" page: 1 }) {
            ..._${PROPERTY_TO_LET_NODE_TYPE}Id_
          }
        }
        query NODE_${PROPERTY_TO_LET_NODE_TYPE}($gmaven_mapped_key: ID!) {
          queryPropertyToLet(input: { property_gmaven_key: $gmaven_mapped_key }){
            ..._${PROPERTY_TO_LET_NODE_TYPE}Id_
          }
        }
        fragment _${PROPERTY_TO_LET_NODE_TYPE}Id_ on ${PROPERTY_TO_LET_NODE_TYPE} { 
          objectID
          gmaven_mapped_key
        }
      `
    },
    {
      remoteTypeName: PROPERTY_FOR_SALE_NODE_TYPE,
      queries: `
        query LIST_${PROPERTY_FOR_SALE_NODE_TYPE}_PAGE1 {
          queryPropertyForSale(input: { gmaven_mapped_key: "" page: 0 }) {
            ..._${PROPERTY_FOR_SALE_NODE_TYPE}Id_
          }
        }
        query LIST_${PROPERTY_FOR_SALE_NODE_TYPE}_PAGE2 {
          queryPropertyForSale(input: { gmaven_mapped_key: "" page: 1 }) {
            ..._${PROPERTY_FOR_SALE_NODE_TYPE}Id_
          }
        }
        query NODE_${PROPERTY_FOR_SALE_NODE_TYPE}($gmaven_mapped_key: ID!) {
          queryPropertyForSale(input: { gmaven_mapped_key: $gmaven_mapped_key }){
            ..._${PROPERTY_FOR_SALE_NODE_TYPE}Id_
          }
        }
        fragment _${PROPERTY_FOR_SALE_NODE_TYPE}Id_ on ${PROPERTY_FOR_SALE_NODE_TYPE} {
          gmaven_mapped_key
        }
      `
    }
  ]

  // Step3. Provide (or generate) fragments with fields to be fetched
  fs.ensureDir(fragmentsDir)
  const fragments = await readOrGenerateDefaultFragments(
    fragmentsDir,
    { schema, gatsbyNodeTypes }
  )

  //const fragments = readOrGenerateDefaultFragments({ schema, gatsbyNodeTypes })

  // Step4. Compile sourcing queries
  const documents = compileNodeQueries({
    schema,
    gatsbyNodeTypes,
    customFragments: fragments,
  })

  // Write compiled queries for debugging
  await writeCompiledQueries(documents)

  return {
    gatsbyApi,
    schema,
    execute,
    gatsbyTypePrefix: `D9_`,
    gatsbyNodeDefs: buildNodeDefinitions({ gatsbyNodeTypes, documents }),
  }
}

async function fetchNodeChanges(lastBuildTime) {

  console.log("Cached build time:", Math.round((lastBuildTime / 1000) - 7200))

  console.log("Starting to fetch CRE data from D9 API");

  const fetch = createApolloFetch({
    uri: process.env.GATSBY_GRAPHQL_D9,
  });

  const updateArray = [];

  return fetch({
    query: `
      query GetUpdated ($time: Int!){ 
        to_let_updated: queryToLetUpdated(input: {last_build: $time}) { 
          objectID
          gmaven_mapped_key 
        } 
        to_let_deleted: queryToLetDeleted {
          objectID
          gmaven_mapped_key: objectID
        }

        for_sale_updated: queryForSaleUpdated(input: {last_build: $time}) { 
          objectID
          gmaven_mapped_key 
        } 
        
        for_sale_deleted: queryForSaleDeleted {
          objectID
          gmaven_mapped_key: objectID
        }
      }
    `,
    variables: { time: Math.round((lastBuildTime / 1000) - 7200) },
  }).then(res => {

    //To let updates
    if (res.data.to_let_updated && res.data.to_let_updated.length > 0) {
      res.data.to_let_updated.map((item, i) => {
        updateArray.push({
          eventName: "UPDATE",
          remoteTypeName: PROPERTY_TO_LET_NODE_TYPE,
          remoteId: { objectID: item.objectID, gmaven_mapped_key: item.gmaven_mapped_key }
        })
      })

      console.info("Updated to let nodes", res.data.to_let_updated.length);
    }

    //To let deleted
    if (res.data.to_let_deleted && res.data.to_let_deleted.length > 0) {
      res.data.to_let_deleted.map((item, i) => {
        updateArray.push({
          eventName: "DELETE",
          remoteTypeName: PROPERTY_TO_LET_NODE_TYPE,
          remoteId: { objectID: item.objectID, gmaven_mapped_key: item.objectID }
        })
      })

      console.info("Deleted to let nodes", res.data.to_let_deleted.length);
    }

    //For sale updates
    if (res.data.for_sale_updated && res.data.for_sale_updated.length > 0) {
      res.data.for_sale_updated.map((item, i) => {
        updateArray.push({
          eventName: "UPDATE",
          remoteTypeName: PROPERTY_FOR_SALE_NODE_TYPE,
          remoteId: { gmaven_mapped_key: item.gmaven_mapped_key }
        })
      })

      console.info("Updated for sale nodes", res.data.for_sale_updated.length);
    }

    //For sale deleted
    if (res.data.for_sale_deleted && res.data.for_sale_deleted.length > 0) {
      res.data.for_sale_deleted.map((item, i) => {
        updateArray.push({
          eventName: "DELETE",
          remoteTypeName: PROPERTY_FOR_SALE_NODE_TYPE,
          remoteId: { gmaven_mapped_key: item.objectID }
        })
      })

      console.info("Deleted for sale nodes", res.data.for_sale_deleted.length);
    }

    return updateArray;

  });

}

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {

  const lastBuildTime = await gatsbyApi.cache.get(`LAST_BUILD_TIME`)

  const config = await createSourcingConfig(gatsbyApi)
  await createSchemaCustomization(config)

  if (lastBuildTime) {
    // Source delta changes
    const nodeEvents = await fetchNodeChanges(lastBuildTime)

    await sourceNodeChanges(config, { nodeEvents })
  } else {
    // Otherwise source everything from scratch as usual
    await sourceAllNodes(config)
  }
  await gatsbyApi.cache.set(`LAST_BUILD_TIME`, Date.now())
}

exports.createPages = async ({ graphql, actions, reporter }) => {

  //Get the data from Gatsby data store
  const result = await graphql(`
    query {
      allD9PropertyToLet {
        group(field: property_gmaven_key, limit: 1) {
          edges {
            node {
              id
              property_gmaven_key
              gmaven_mapped_key
              property_name
              suburb
              property_category
              best_image
              web_ref
            }
          }
        }
        edges {
          node {
            id
            property_gmaven_key
            gmaven_mapped_key
            property_name
            suburb
            property_category
            unit_category
            unit_id
            best_image
            web_ref
          }
        }
      }

      allD9PropertyForSale {
        edges {
          node {
            id
            gmaven_mapped_key
            property_name
            suburb
            property_category
            property_type
            best_image
            web_ref
            unit_id
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "cre-plugin createPages" query')
  }


  //Properties to let 1 of 2
  const propToLet = result.data.allD9PropertyToLet.group;

  propToLet.forEach(({ edges }, index) => {

    const previous = index === propToLet.length - 1 ? null : propToLet[index + 1].edges[0].node
    const next = index === 0 ? null : propToLet[index - 1].edges[0].node

    const prop_web_ref = edges[0].node.web_ref.substring(0, 16);

    //Create page
    actions.createPage({
      path: makePropertyPagePath(edges[0].node, "ToLet", "property"),
      component: path.resolve(`./src/templates/propertyToLet.js`),
      context: {
        id: edges[0].node.property_gmaven_key,
        gmaven_mapped_key: edges[0].node.gmaven_mapped_key,
        property_name: edges[0].node.property_name,
        property_category: edges[0].node.property_category,
        suburb: edges[0].node.suburb,
        best_image: edges[0].node.best_image,
        previous,
        next
      }
    })

    //Brochure redirect
    actions.createRedirect({
      fromPath: `/results/property/web-ref/ q=${prop_web_ref} dt=lease id=${edges[0].node.property_gmaven_key}`,
      toPath: makePropertyPagePath(edges[0].node, "ToLet", "property"),
      isPermanent: true,
      redirectInBrowser: true
    });

  })


  //Units to let 1 of 2
  const unitToLet = result.data.allD9PropertyToLet.edges;

  unitToLet.forEach(({ node }, index) => {
 
    const previous = index === unitToLet.length - 1 ? null : unitToLet[index + 1].node
    const next = index === 0 ? null : unitToLet[index - 1].node

    actions.createPage({
      path: makePropertyPagePath(node, "ToLet", "property_unit"),
      component: path.resolve(`./src/templates/propertyUnitToLet.js`),
      context: {
        id: node.gmaven_mapped_key,
        gmaven_mapped_key: node.gmaven_mapped_key,
        property_name: node.property_name,
        property_category: node.property_category,
        unit_category: node.unit_category,
        suburb: node.suburb,
        best_image: node.best_image,
        previous,
        next
      }
    })

    //Brochure redirect
    actions.createRedirect({
      fromPath: `/results/unit/web-ref/ q=${node.web_ref} dt=lease id=${node.gmaven_mapped_key}`,
      toPath: makePropertyPagePath(node, "ToLet", "property_unit"),
      isPermanent: true,
      redirectInBrowser: true
    });

  })


  //Properties for sale 1 of 2
  const propForSale = result.data.allD9PropertyForSale.edges;

  propForSale.forEach(({ node }, index) => {

    const previous = index === propForSale.length - 1 ? null : propForSale[index + 1].node
    const next = index === 0 ? null : propForSale[index - 1].node

    actions.createPage({
      path: makePropertyPagePath(node, "ForSale", node.property_type),
      component: path.resolve(`./src/templates/propertyForSale.js`),
      context: {
        id: node.gmaven_mapped_key,
        gmaven_mapped_key: node.gmaven_mapped_key,
        property_name: node.property_name,
        property_category: node.property_category,
        suburb: node.suburb,
        best_image: node.best_image,
        previous,
        next
      }
    })

    //Brochure redirect
    actions.createRedirect({
      fromPath: `/results/${node.property_type.replace("property_unit", "unit")}/web-ref/ q=${node.web_ref} dt=sale id=${node.gmaven_mapped_key}`,
      toPath: makePropertyPagePath(node, "ForSale", node.property_type),
      isPermanent: true,
      redirectInBrowser: true
    });

  })


  //Search redirects

  var dataArray = ([...unitToLet, ...propForSale])

  var suburbArray = [...new Set(dataArray.map(({ node }) => node.suburb))]
  var categoryArray = [...new Set(dataArray.map(({ node }) => node.property_category))]

  var suburbRoutes = []
  var categoryRoutes = []

  const catArr = new Promise((resolve, reject) => {
    categoryArray.forEach((category) => {
      categoryRoutes.push({
        type: "property",
        deal: "ToLet",
        category: category,
      })
      categoryRoutes.push({
        type: "property",
        deal: "ForSale",
        category: category,
      })
      categoryRoutes.push({
        type: "property_unit",
        deal: "ToLet",
        category: category,
      })
      categoryRoutes.push({
        type: "property_unit",
        deal: "ForSale",
        category: category,
      })
      resolve();
    })
  })

  const subArr = new Promise((resolve, reject) => {
    suburbArray.forEach((suburb) => {
      categoryArray.forEach((category) => {
        suburbRoutes.push({
          type: "property",
          deal: "ToLet",
          category: category,
          suburb: suburb
        })
        suburbRoutes.push({
          type: "property",
          deal: "ForSale",
          category: category,
          suburb: suburb
        })
        suburbRoutes.push({
          type: "property_unit",
          deal: "ToLet",
          category: category,
          suburb: suburb
        })
        suburbRoutes.push({
          type: "property_unit",
          deal: "ForSale",
          category: category,
          suburb: suburb
        })
      })
      resolve();
    })
  })

  catArr.then(() => {
    categoryRoutes.forEach((category) => {
      actions.createRedirect({
        fromPath: makePropertyRedirectPath(category, "category"),
        toPath: `/listings/search?page=1&sortBy=${category.deal}&query=&refinementList%5Bproperty_category%5D%5B0%5D=${makeSlug(category.category)}`,
        isPermanent: true,
        redirectInBrowser: true
      });
    })
  })

  subArr.then(() => {
    suburbRoutes.forEach((suburb) => {
      actions.createRedirect({
        fromPath: makePropertyRedirectPath(suburb, "suburb"),
        toPath: `/listings/search?page=1&sortBy=${suburb.deal}&query=&refinementList%5Bsuburb_cluster%5D%5B0%5D=${makeSlug(suburb.suburb)}&refinementList%5Bproperty_category%5D%5B0%5D=${makeSlug(suburb.category)}`,
        isPermanent: true,
        redirectInBrowser: true
      });
    })
  })

}

exports.onPreInit = () => console.log("Loaded cre-plugin");