import React from 'react';

import { connectRange } from 'react-instantsearch-dom';

import { StyledInput } from "site/src/components/css";

const GLAMaxRefinementList = ({ currentRefinement, refine, min, max }) => {

  return (
    <StyledInput>

      {/* <label htmlFor="maxgla">Max GLA</label> */}
      <input
        id="maxgla"
        type="number"
        placeholder="Max GLA"
        onBlur={event => {
          refine({
            ...currentRefinement,
            max: event.currentTarget.value,
          })
        }}
        min={min}
        max={max}
        aria-label="max-gla"
        defaultValue={currentRefinement.max === 10000000000 ? "" : currentRefinement.max}
      />

    </StyledInput>

  )
};

export default connectRange(GLAMaxRefinementList);