// import React from "react";
// import { useStaticQuery, graphql, Link } from "gatsby";

// export default function PopularSearch() {

//   const data = useStaticQuery(graphql`
//     query {
//       allContentfulPopularSearch {
//         edges {
//           node {
//             category
//             deal
//             id
//             slug
//             title
//             image {
//               file {
//                 url
//               }
//             }
//             searchUrl {
//               searchUrl
//             }
//           }
//         }
//       }
//     }
//   `)

//   return (
//     <div> 
//       {
//         data.allContentfulPopularSearch.edges.map((search, i) => {
//           return (
//             <div key={i}>
//               <img alt={search.node.title} src={search.node.image.file.url} width="200px" />
//               <p>{search.node.title}</p>
//               <p>{search.node.category}</p>
//               <p>{search.node.deal}</p>
//               <Link to={search.node.searchUrl.searchUrl}>Here to search</Link>
//             </div>
//           )
//         })
//       }
//     </div>
//   )
// }