import React from "react"

var formatParking = require("../utils/formatter").formatParking

const Parking = ({property, parking}) => {
  if (parking === "Yes") {
    return (
      <div>

        <h6>Parking</h6>
        
        <p>Property parking ratio: {formatParking(property.parking.property_parking_ratio)}</p>
        <p>Open bays: {property.parking.property_parking_open}</p>
        <p>Basement bays: {property.parking.property_parking_basement}</p>
        <p>Covered bays: {property.parking.property_parking_covered}</p>
        <p>Shaded bays: {property.parking.property_parking_shade}</p>
        <p>Tandem bays: {property.parking.property_parking_tandem}</p>

      </div>
    )
  } else {
    return (
      <div>

        <h6>Parking</h6>
        <p>Parking information either not provided or property does not have parking available</p>

      </div>
    )
  }
}

export default Parking