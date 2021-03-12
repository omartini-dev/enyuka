import React, { Fragment } from "react";

import { PropertyHit } from "../searchComponents";

import { Grid3 } from "site/src/components/css";

var _ = require('lodash');

function RelatedProperty({ property, deal }) {

  var propertyGroup = [];

  if (deal === "ToLet") {

    propertyGroup = Object.values(_.groupBy(property, 'property_gmaven_key'));

  } else {

    propertyGroup = property;

  }
  return (

    <div>

      {
        propertyGroup.length > 0 && (

          <Fragment>

            <h3>Related properties ({propertyGroup.length > 9 ? 9 : propertyGroup.length})</h3>

            <Grid3>

              {
                propertyGroup.slice(0, 9).map((property, i) => {

                  const DealData = () => {
                    //To let

                    if (deal === "ToLet") {

                      return (

                        <div key={i} className="flatGrid" style={{ border: "2px solid white", backgroundImage: `url(${property[0].best_image ? property[0].best_image.replace("c_fill,h_600,w_600", "c_fill,h_600,w_600,f_auto") : process.env.GATSBY_COMPANY_LOGO_SQUARE})` }}>

                          <PropertyHit
                            hitData={property}
                            type={deal}
                            i={i}
                          />

                        </div>
                      )
                    }

                    //For sale property
                    if (deal === "ForSale") {

                      return (

                        <div key={i} className="flatGrid" style={{ border: "2px solid white", backgroundImage: `url(${property.best_image ? property.best_image.replace("c_fill,h_600,w_600", "c_fill,h_600,w_600,f_auto") : process.env.GATSBY_COMPANY_LOGO_SQUARE})` }}>

                          <PropertyHit
                            hitData={property}
                            type={deal}
                            i={i}
                          />

                        </div>
                      )
                    }
                  }

                  return (
                    <div key={i}>
                      <DealData />
                    </div>
                  )
                })
              }

            </Grid3>

          </Fragment>

        )
      }

    </div>

  )

}

export default RelatedProperty