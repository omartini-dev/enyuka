import React from "react";

import { PropertyHit } from "../searchComponents";

import { Grid31, StyledFeatured } from "site/src/components/css";

var _ = require("lodash");

const Featured = ({ data }) => {

  //Group the results so we get property results and not unit results
  var toLetProperty = Object.values(_.groupBy(data.featuredToLet.nodes, 'property_gmaven_key'));
  var forSaleProperty = data.featuredForSale.nodes;

  var featuredArray = ([...toLetProperty, ...forSaleProperty])//.sort(() => Math.random() - 0.5);

  //Shuffle featured properties
  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //Check that featured properties exist
  if (featuredArray.length > 0) {

    //const shuffledProps = shuffleArray(featuredArray);
    const shuffledProps = featuredArray;

    return (

      <StyledFeatured>

        <h3>Featured properties</h3>
        {/* <h4>{featuredArray.length > 9 ? 9 : featuredArray.length} properties</h4> */}

        <Grid31>

          {
            shuffledProps.slice(0, 6).map((property, i) => {
              if (property.length) {
                return (

                  <div key={i} className="staggeredGrid" style={{ border: "2px solid white", backgroundImage: `url(${property[0].best_image ? property[0].best_image.replace("c_fill,h_600,w_600", "c_fill,h_600,w_600,f_auto") : process.env.GATSBY_COMPANY_LOGO_SQUARE})` }}>

                    <PropertyHit
                      hitData={property}
                      type="ToLet"
                      i={i}
                    />

                  </div>

                )
              } else {
                return (

                  <div key={i} className="staggeredGrid" style={{ border: "2px solid white", backgroundImage: `url(${property.best_image ? property.best_image.replace("c_fill,h_600,w_600", "c_fill,h_600,w_600,f_auto") : process.env.GATSBY_COMPANY_LOGO_SQUARE})` }}>

                    <PropertyHit
                      hitData={property}
                      type="ForSale"
                      i={i}
                    />

                  </div>

                )
              }
            })
          }

        </Grid31>

      </StyledFeatured>
    )
  } else {
    return "No featured properties"
  }

}

export default Featured