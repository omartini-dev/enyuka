import React, { Fragment } from "react";
import { Link } from "gatsby";

import { StyledTable } from "site/src/components/css";

const { makePropertyPagePath } = require(`../utils/urlGenerator`)
var formatCurrency = require("../utils/formatter").formatCurrency
var formatCurrencyGLA = require("../utils/formatter").formatCurrencyGLA
var formatGLA = require("../utils/formatter").formatGLA

export default function Units({ units }) {

  var space_breakdown = null;
  var min_gla = null;
  var complex_space = "No";

  const SpaceBreakdown = (data, parent) => {
    if (data.data !== null) {
      return (
        <Fragment>
          <tr>
            <td colSpan="10">{data.parent} space breakdown</td></tr>
          <tr>
            <td colSpan="2">Space ID</td>
            <td colSpan="2">Space category</td>
            <td colSpan="2">Space GLA</td>
            <td colSpan="2">Price</td>
            <td colSpan="2">Space gross price</td>
          </tr>
          {
            data.data.map((space, i) => {
              return (
                <tr key={i} >
                  <td colSpan="2">{space.space_id}</td>
                  <td colSpan="2">{space.space_category}</td>
                  <td colSpan="2">{formatGLA(space.space_gla)}</td>
                  <td colSpan="2">{formatCurrency(space.space_gla * space.space_asking_gross_monthly_rental_m2)} /month</td>
                  <td colSpan="2">{formatCurrencyGLA(space.space_asking_gross_monthly_rental_m2)}</td>
                </tr>
              )
            })
          }
        </Fragment>
      )
    } else {
      return false
    }
  }

  return (
    <StyledTable>
      
      <h5 id="units">Unit breakdown</h5>

      <table>

        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Catgeory</th>
            <th>GLA</th>
            <th colSpan="2">Gross price</th>
            <th colSpan="2">Net price</th>
            <th>Sub divisible</th>
            {/* <th>Complex space</th> */}
            {/* <th>Individually lettable</th> */}
          </tr>
        </thead>
        <tbody>
          {
            units.map((unit, i) => {
              if (unit.complex_space === 1 && unit.space_breakdown.length > 0) {
                space_breakdown = unit.space_breakdown;
                complex_space = "Yes";
              } else {
                space_breakdown = null;
                complex_space = "No";
              }

              if (unit.sub_divisible === "Yes") {
                min_gla = " (" + formatGLA(unit.min_gla) + ")";
              } else {
                min_gla = "";
              }

              return (
                <Fragment key={i}>

                  <tr>
                    <td><Link to={makePropertyPagePath(unit, "ToLet", "property_unit")} key={unit.gmaven_mapped_key}>{unit.unit_id}</Link></td>
                    <td>{unit.unit_category}</td>
                    <td>{formatGLA(unit.max_gla)}</td>
                    <td colSpan="2">{formatCurrencyGLA(unit.gross_price)}</td>
                    <td colSpan="2">{formatCurrencyGLA(unit.net_price)}</td>
                    <td>{unit.sub_divisible + min_gla}</td>
                    {/* <td>{complex_space}</td> */}
                    {/* <td>{unit.this_unit_can_be_leased_by_itself}</td> */}
                  </tr>

                  <SpaceBreakdown data={space_breakdown} parent={unit.unit_id} />

                </Fragment>
              )
            })
          }
        </tbody>

      </table>

    </StyledTable>
  )
}