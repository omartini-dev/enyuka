import React from 'react';

import { connectPagination } from 'react-instantsearch-dom';

import { StyledPagination } from "site/src/components/css";

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (

  <StyledPagination>

    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;
      const style = {
        fontWeight: currentRefinement === page ? 'bold' : '',
      };

      return (
        <li key={index}>
          <a
            className="button"
            href={createURL(page)}
            style={style}
            onClick={e => { e.preventDefault(); refine(page); }}
          >
            {page}
          </a>
        </li>
      );
    })}

  </StyledPagination>

);

export default connectPagination(Pagination);