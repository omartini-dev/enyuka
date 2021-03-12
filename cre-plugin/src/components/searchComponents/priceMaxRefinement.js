import React from 'react';

import { connectRange } from 'react-instantsearch-dom';

import { StyledInput } from "site/src/components/css";

const PriceMaxRefinementList = ({ currentRefinement, refine, deal, min, max }) => {

  var spaceLabel = null;

  if (deal === 'ToLet') {
    spaceLabel = `Max price (gross/${process.env.GATSBY_SPACE_SQUARED})`

  } else {
    spaceLabel = "Max price"
  }
  return (

    <StyledInput>

      {/* <label htmlFor="maxprice">{spaceLabel}</label> */}
      <input
      id="maxprice"
      type="number"
      placeholder={spaceLabel}
      onBlur={event => {
        refine({
          ...currentRefinement,
          max: event.currentTarget.value,
        })
      }
      }
      min={min}
      max={max}
      aria-label="max-price"
      defaultValue={currentRefinement.max === 10000000000 ? "" : currentRefinement.max}
    />

    </StyledInput>

  )
};

export default connectRange(PriceMaxRefinementList);