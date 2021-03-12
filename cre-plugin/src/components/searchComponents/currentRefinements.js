import React from 'react';

import { connectCurrentRefinements } from 'react-instantsearch-dom';

const CurrentRefinements = ({ items, refine, createURL }) => {
  const unique = [];
  items.map(x => unique.filter(a => a.attribute === x.attribute).length > 0 ? null : unique.push(x));
  return (
    <div className="pillFilters">
      {
        unique.map((item, i) => {
          if (item.id === 'query') {
            var query =
              <span key={`nestedRQuery${i}`}>
                <div
                  tag="a"
                // handleClose={event => {
                //   event.preventDefault();
                //   refine(item.value);
                //   createURL(item.value);
                // }}
                >
                  {
                    "Query: " + item.currentRefinement}
                </div>
              </span>
          }
          return (
            <React.Fragment key={`nestedFrag${i}`}>
              {query}
              {
                item.items ? (
                  <React.Fragment>
                    {
                      item.items.map((nested, i) => (
                        <span key={`nestedRef${i}`}>
                          {
                            <div
                              tag="a"
                            // handleClose={event => {
                            //   event.preventDefault();
                            //   refine(nested.value);
                            //   createURL(nested.value);
                            // }}
                            >
                              {item.label.slice(0, -2).replace('suburb_cluster', '').replace('property_category', '') + nested.label.replace("VacantLand", "Vacant Land")}
                            </div>
                          }
                        </span>
                      ))}
                  </React.Fragment>
                ) : (
                    <a
                      href={createURL(item.value)}
                      onClick={e => { e.preventDefault(); refine(item.value); }}
                    >
                    </a>
                  )
              }
              {
                item.currentRefinement.max ? (
                  <React.Fragment>
                    <div
                      tag="a"
                    // handleClose={event => {
                    //   event.preventDefault();
                    //   refine(item.value);
                    //   createURL(item.value);
                    // }}
                    >
                      {(item.currentRefinement.min === 0 ? "" : "> " + item.attribute.replace('min_price', 'R').replace('gross_price', 'R').replace('min_gla', '').replace('max_gla', '') + item.currentRefinement.min.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }) + item.attribute.replace('min_price', '').replace('gross_price', '').replace('min_gla', 'm²').replace('min_gla', 'm²')) + (item.currentRefinement.max === 10000000000 ? "" : "< " + item.attribute.replace('min_price', 'R').replace('gross_price', 'R').replace('min_gla', '').replace('max_gla', '') + item.currentRefinement.max.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }) + item.attribute.replace('min_price', '').replace('gross_price', '').replace('min_gla', 'm²').replace('max_gla', 'm²'))}
                    </div>
                  </React.Fragment>
                ) : (
                    <a
                      href={createURL(item.value)}
                      onClick={e => { e.preventDefault(); refine(item.value); }}
                    >
                    </a>
                  )
              }
            </React.Fragment>
          )
        })
      }
    </div>
  )
};

export default connectCurrentRefinements(CurrentRefinements);