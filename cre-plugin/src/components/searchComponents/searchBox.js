import React from 'react';

import { connectSearchBox } from 'react-instantsearch-dom';

import { StyledInput } from "site/src/components/css";

const SearchBox = ({ currentRefinement, refine }) => {
  return (

    <StyledInput>

      <input
        id="searchBox"
        type="search"
        value={currentRefinement}
        onChange={event => {
          refine(event.currentTarget.value)
        }}
        placeholder="Search our properties"
        aria-label="searchBox"
      />

      </StyledInput>

  )
};

export default connectSearchBox(SearchBox);