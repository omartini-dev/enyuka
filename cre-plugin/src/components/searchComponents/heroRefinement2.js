import React, { Fragment } from 'react';

import { connectRefinementList } from 'react-instantsearch-dom';

import { Multiselect } from 'multiselect-react-dropdown';

const HeroRefinementList = ({ items, refine, placeholder }) => {

  return (

    <Fragment>

      {
        typeof window !== 'undefined' && (

          <Multiselect
            id="multiSelect"
            avoidHighlightFirstOption
            placeholder={items.filter(item => item.isRefined).length ? items.filter(item => item.isRefined).length + " selected" : placeholder}
            selectedValues={items.filter(item => item.isRefined)}
            showCheckbox
            emptyRecordMsg={`No ${placeholder} found`}
            closeOnSelect={true}
            onSelect={
              event => {
                if (event && event.length > 0) {
                  refine(event.map(e => e.label));
                } else {
                  refine([]);
                }
              }
            }
            onRemove={
              event => {
                if (event && event.length > 0) {
                  refine(event.map(e => e.label));
                } else {
                  refine([]);
                }
              }
            }
            options={
              items.map((item) => (
                item
              ))
            }
            displayValue="label"
            style={{
              searchBox: {
                background: "transparent",
              },
              chips: {
                display: "none",
              },
              inputField: {
                margin: 0,

              }
            }}
          />

        )
      }

    </Fragment>

  )
};

export default connectRefinementList(HeroRefinementList);