import React, { Fragment } from 'react';

import { connectSortBy } from 'react-instantsearch-dom';

const DealSwitch = connectSortBy(({ refine, items }) => {

  return (

    <Fragment>

      {
        typeof window !== 'undefined' && (
          <Fragment>

            <button onClick={(e) => { e.preventDefault(); refine(items[0].value); }} className={`deal` + items[0].isRefined}>
              {items[0].value.replace("ToLet", "To let").replace("ForSale", "For sale")}
            </button>

            <button onClick={(e) => { e.preventDefault(); refine(items[1].value); }} className={`deal` + items[1].isRefined}>
              {items[1].value.replace("ToLet", "To let").replace("ForSale", "For sale")}
            </button>

          </Fragment>
        )
      }

    </Fragment>

  )

});

export default DealSwitch;