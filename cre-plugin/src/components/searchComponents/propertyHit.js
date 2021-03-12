import React, { useState } from 'react';
import { Link } from "gatsby";

import { Carousel, InfoTab } from "site/src/components";
import { Grid6 } from "site/src/components/css";

const { makePropertyPagePath } = require("../utils/urlGenerator")

function PropertyHit({ hitData, type, i }) {

  const [open, setOpen] = useState(0);

  var property = hitData;

  if (type === "ToLet") {

    return (

      <Grid6>

        <div>

          <Link to={makePropertyPagePath(property[0], "ToLet", "property")} key={i}>

            <InfoTab info={property} open={open} deal="ToLet" type="property" i={i} />

          </Link>

        </div>

        <Carousel open={open} setOpen={setOpen} />

      </Grid6>

    )
  } else if (type === "ForSale") {
    return (

      <Grid6>

        <div>

          <Link to={makePropertyPagePath(property, "ForSale", property.property_type)} key={i}>

            <InfoTab info={property} open={open} deal="ForSale" type="property" i={i} />

          </Link>

        </div>

        <Carousel open={open} setOpen={setOpen} />

      </Grid6>

    )
  } else {
    return (
      <div>No results</div>
    )
  }

}

export default PropertyHit