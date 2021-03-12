import React from "react";
import { Link } from "gatsby";

import { Grid22 } from "site/src/components/css";

const { makePropertyPagePath } = require(`../utils/urlGenerator`);

var formatCurrency = require("../utils/formatter").formatCurrency;
var formatCurrencyGLA = require("../utils/formatter").formatCurrencyGLA;
var formatGLA = require("../utils/formatter").formatGLA;

var priceRange = require("../utils/priceGlaData").priceRange;
var glaRange = require("../utils/priceGlaData").glaRange;

function PropertyDetail({ property, deal, type }) {

  //Deal specific data
  var DealData = () => {

    if (deal === "ToLet" && type === "property") {
      return (
        <div className="dealData">

          <p>{property[0].marketing.property_marketing_description}</p>

          <Grid22>

            <div>
              <h6>Category</h6>
              <p>{property[0].property_category}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>{property[0].street_address + ", " + property[0].suburb}</p>
            </div>
            <div>
              <h6>Price (gross)</h6>
              <p>{formatCurrencyGLA(priceRange(property).gross_price_1, priceRange(property).gross_price_2)}</p>
            </div>
            <div>
              <h6>GLA</h6>
              <p>{formatGLA(glaRange(property).gla_1, glaRange(property).gla_2)}</p>
            </div>
            <div>
              <h6>Units</h6>
              <p><a href="#units">{property.length}</a></p>
            </div>
            <div>
              <h6>Price from (gross)</h6>
              <p>{formatCurrency(priceRange(property).priceFrom)} /month</p>
            </div>

          </Grid22>

        </div>
      )
    }

    if (deal === "ToLet" && type === "property_unit") {
      return (
        <div className="dealData">

          <h5><Link to={makePropertyPagePath(property[0], "ToLet", "property")}>You are viewing a property unit - click to view parent property</Link></h5>
          <p>{property[0].marketing.unit_marketing_description}</p>

          <Grid22>

            <div>
              <h6>Unit ID</h6>
              <p>{property[0].unit_id}</p>
            </div>
            <div>
              <h6>Category</h6>
              <p>{property[0].secondary_category ? property[0].secondary_category : "No secondary category"}</p>
            </div>
            <div>
              <h6>Price (gross)</h6>
              <p>{formatCurrencyGLA(priceRange(property).gross_price_1, priceRange(property).gross_price_2)}</p>
            </div>
            <div>
              <h6>GLA</h6>
              <p>{formatGLA(glaRange(property).gla_1, glaRange(property).gla_2)}</p>
            </div>
            <div>
              <h6>Price from (gross)</h6>
              <p>{formatCurrency(priceRange(property).priceFrom)} /month</p>
            </div>

          </Grid22>

        </div>
      )
    }

    if (deal === "ForSale" && type === "property") {
      return (
        <div className="dealData">

          <p>{property[0].marketing.property_marketing_description}</p>

          <Grid22>

            <div>
              <h6>Category</h6>
              <p>{property[0].property_category}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>{property[0].street_address + ", " + property[0].suburb}</p>
            </div>
            <div>
              <p>Price</p>
              <p>{formatCurrency(priceRange(property).gross_price_1)}</p>
            </div>
            <div>
              <h6>GLA</h6>
              <p>{formatGLA(glaRange(property).gla_1)}</p>
            </div>

          </Grid22>

        </div>
      )
    }

    if (deal === "ForSale" && type === "property_unit") {
      return (
        <div className="dealData">

          <p>{property[0].marketing.property_marketing_description}</p>

          <Grid22>

            <div>
              <h6>Category</h6>
              <p>{property[0].property_category}</p>
            </div>
            <div>
              <h6>Address</h6>
              <p>{property[0].street_address + ", " + property[0].suburb}</p>
            </div>
            <div>
              <h6>Price</h6>
              <p>{formatCurrency(priceRange(property).gross_price_1)}</p>
            </div>
            <div>
              <h6>GLA</h6>
              <p>{formatGLA(glaRange(property).gla_1)}</p>
            </div>

          </Grid22>

        </div>
      )
    }

  }

  return (
    <div>

      <DealData />

      {/* <Grid22>

        <GeneralFeatures property={property[0]} />

        <div>

          <Features property={property[0]} category={property[0].property_category} />

          <Parking property={property[0]} parking={property[0].parking.property_parking} />

        </div>

      </Grid22> */}

    </div>
  )
}

export default PropertyDetail;