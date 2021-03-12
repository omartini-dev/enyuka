import React from 'react';

import { connectSortBy } from 'react-instantsearch-dom';

import Select from 'react-select';

const DealSwitch = connectSortBy(({ refine, items }) => {
  return (

    <Select
      id="multiSelect"
      value={items.filter(item => item.isRefined).map(({ value, isRefined }) => ({
        label: value.replace("ToLet", "To let").replace("ForSale", "For sale"),
        value: value,
        isRefined: isRefined
      }))}
      onChange={
        event => {
          refine(event.value);
        }
      }
      options={
        items.map(({ value, isRefined }) => ({
          label: value.replace("ToLet", "To let").replace("ForSale", "For sale"),
          value: value,
          isRefined: isRefined
        }))
      }
      isSearchable = {false}
    />

  );
});

export default DealSwitch;