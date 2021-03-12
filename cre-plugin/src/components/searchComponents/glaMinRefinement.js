import React from 'react';

import { connectRange } from 'react-instantsearch-dom';

import { StyledInput } from "site/src/components/css";

const GLAMinRefinementList = ({ currentRefinement, refine, min, max }) => {

  return (

    <StyledInput>

      {/* <label htmlFor="mingla">Min GLA</label> */}
      <input
      id="mingla"
      type="number"
      placeholder="Min GLA"
      onBlur={event => {
        refine({
          ...currentRefinement,
          min: event.currentTarget.value,
        })
      }
      }
      min={min}
      max={max}
      aria-label="min-gla"
      defaultValue={currentRefinement.min === 0 ? "" : currentRefinement.min}
    />

    </StyledInput>
  )
};

export default connectRange(GLAMinRefinementList);
