import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const ClearRefinementList = ({ items, refine }) => {
  return (
    <button
      className="clearRefinements"
      aria-label="clearRefinements"
      type="reset"
      onClick={(e) => { e.preventDefault(); refine(items); }}
      disabled={!items.length}
    >
      Reset
    </button>
  )
};

export default connectCurrentRefinements(ClearRefinementList);