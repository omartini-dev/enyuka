const postQuery = `{
  allContentfulPost {
    edges {
      node {
        objectID: id
        title
        slug
        tags
        image {
          file {
            url
          }
        }
        summary
        body {
          content {
            content {
              value
            }
          }
        }
        author {
          name
          slug
          shortBio
        }
        featured
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { image, author, body, ...rest } }) => ({
    ...image,
    ...author,
    ...body,
    ...rest,
  }))

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.allContentfulPost.edges),
    indexName: process.env.GATSBY_ALGOLIA_POSTS,
  },
]

module.exports = queries