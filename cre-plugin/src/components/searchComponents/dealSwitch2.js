import React, { Fragment } from 'react';

import { connectSortBy } from 'react-instantsearch-dom';

import { Multiselect } from 'multiselect-react-dropdown';

const DealSwitch = connectSortBy(({ refine, items }) => {

  return (
    <Fragment>
      {
        typeof window !== 'undefined' && (

          <Multiselect
            id="multiSelect-deal"
            singleSelect
            avoidHighlightFirstOption
            placeholder={items.filter(item => item.isRefined)[0].value.replace("ToLet", "To let").replace("ForSale", "For sale")}
            // selectedValues={items.filter(item => item.isRefined) || [{
            //   label: "To let"
            // }]}
            onSelect={event => refine(event[0].value)}
            options={
              items.map(({ value, isRefined }) => ({
                label: value.replace("ToLet", "To let").replace("ForSale", "For sale"),
                value: value,
                isRefined: isRefined
              }))
            }
            displayValue="label"
            style={{
              searchBox: {
                background: "transparent",
                letterSpacing: "1px",
                padding: "5px"
              },
              chips: {
                color: "white",
                fontSize: "1rem",
                margin: "0px",
                textAlign: "center",
                display: "block",
                textTransform: "uppercase"
              },
              optionContainer: {
                width: "auto"
              },
            }}
          />

        )
      }
    </Fragment>
  );
});

export default DealSwitch;