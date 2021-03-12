import React from 'react';

import { connectRange } from 'react-instantsearch-dom';

import { StyledInput } from "site/src/components/css";

const PriceMinRefinementList = ({ currentRefinement, refine, deal, min, max }) => {

  var spaceLabel = null;

  if (deal === 'ToLet') {
    spaceLabel = `Min price (gross/${process.env.GATSBY_SPACE_SQUARED})`

  } else {
    spaceLabel = "Min price"
  }
  return (
    
    <StyledInput>

      {/* <label htmlFor="minprice">{spaceLabel}</label> */}
      <input
      id="minprice"
      type="number"
      placeholder={spaceLabel}
      onBlur={event =>
        refine({
          ...currentRefinement,
          min: event.currentTarget.value,
        })
      }
      min={min}
      max={max}
      aria-label="min-price"
      defaultValue={currentRefinement.min === 0 ? "" : currentRefinement.min}
    />

    </StyledInput>

  )
};

export default connectRange(PriceMinRefinementList);