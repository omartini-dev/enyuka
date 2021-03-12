import React from 'react';
import { connectHits, connectStateResults } from 'react-instantsearch-dom';

import { PropertyHit } from ".";

import { Grid31 } from "site/src/components/css";

var _ = require('lodash');
var property = [];

const SearchResults = ({ hits, type, isSearchStalled }) => {

  var image = null;

  if (type === "ToLet") {
    property = Object.values(_.groupBy(hits, 'property_gmaven_key'));
  } else {
    property = hits;
  }

  //Loading
  if (isSearchStalled) {
    return (
      <div className="loader"></div>
    )
  }

  //Results
  if (property.length > 0 && !isSearchStalled) {

    return (

      <Grid31>

        {
          property.map((hit, i) => {

            if (hit.length) {
              image = hit[0];
            } else {
              image = hit;
            }

            return (

              <div key={i} className="staggeredGrid" style={{ border: "2px solid white", backgroundImage: `url(${image.best_image ? image.best_image.replace("c_fill,h_600,w_600", "c_fill,h_600,w_600,f_auto") : process.env.GATSBY_COMPANY_LOGO_SQUARE})` }}>

                <PropertyHit
                  hitData={hit}
                  type={type}
                  i={i}
                />

              </div>

            )
          })
        }

      </Grid31>

    )
  }

  //No results
  if (property.length === 0 && !isSearchStalled) {
    return "Ooops, we have no results that meet your search criteria. Please reset your filters and try again."
  }

}

export default connectHits(connectStateResults(SearchResults))