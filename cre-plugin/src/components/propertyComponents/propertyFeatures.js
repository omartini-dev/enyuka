import React from "react"

var formatBoolean = require("../utils/formatter").formatBoolean

//General features
const GeneralFeatures = ({ property }) => {
  return ( 
    <div>

      <h6>General features</h6>

      <p>{formatBoolean(property.general_features.property_naming_rights, "Property naming rights", "general")}</p>
      <p>{formatBoolean(property.general_features.has_security, "Security", "general")}</p>
      <p>{formatBoolean(property.general_features.security_guards, "Security guards", "general")}</p>
      <p>{formatBoolean(property.general_features.security_hours, "Security hours", "general")}</p>
      <p>{formatBoolean(property.general_features.security_responsibility,"Security responsibility", "general")}</p>
      <p>{formatBoolean(property.general_features.security_infrustructure,"Security infrustructure", "general")}</p>
      <p>{formatBoolean(property.general_features.green_certification,"Green certification", "general")}</p>
      <p>{formatBoolean(property.general_features.green_certification_rating,"Green rating", "general")}</p>
      <p>{formatBoolean(property.general_features.has_generators,"Generators", "general")}</p>
      <p>{formatBoolean(property.general_features.solar,"Solar", "general")}</p>
      <p>{formatBoolean(property.general_features.backup_water_supply,"Backup water supply", "general")}</p>
      <p>{formatBoolean(property.general_features.canteen,"Canteen", "general")}</p>
      <p>{formatBoolean(property.general_features.property_kitchenette,"Kitchenette", "general")}</p>
      <p>{formatBoolean(property.general_features.gym,"Gym", "general")}</p>
      <p>{formatBoolean(property.general_features.boardroom,"Boardroom", "general")}</p>
      <p>{formatBoolean(property.general_features.showers,"Showers", "general")}</p>

    </div>
  )
}

//Category specific features
const Features = ({ property, category }) => {
  if (category === "Office") {
    return (
      <div>

        <h6>{property.property_category} features</h6>

        <p>{formatBoolean(property.office_features.has_aircon,"Aircon", "office")}</p>
        <p>{formatBoolean(property.office_features.no_floors,"No. floors", "office")}</p>
        <p>{formatBoolean(property.office_features.lift_count,"Lift count", "office")}</p>
        <p>{formatBoolean(property.office_features.lift_cores,"Lift cores", "office")}</p>
        <p>{formatBoolean(property.office_features.building_shape,"Building shape", "office")}</p>
        <p>{formatBoolean(property.office_features.has_internet,"Internet", "office")}</p>
        <p>{formatBoolean(property.office_features.internet_provider,"Internet provider/s", "office")}</p>

      </div>
    )
  } else if (category === "Industrial") {
    return (
      <div>

        <h6>{property.property_category} features</h6>

        <p>{formatBoolean(property.industrial_features.power_phase,"Power phase", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.power_output,"Power output", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.power_unit,"Power unit", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.has_yard,"Yard", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.height_to_eaves,"Height to eaves", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.lux_level,"Lux level", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.lux_description,"Lux description", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.gantry_cranes,"Gantry cranes", "industrial")}</p>
        <p>{formatBoolean(property.industrial_features.floor_load_capacity,"Floor load capacity", "industrial")}</p>

      </div>
    )
  } else {
    return (
      <div>

        <h6>{property.property_category} features</h6>
        
        <p>{property.property_category} specific features are not available</p>

      </div>
    )
  }
}

export { GeneralFeatures, Features }