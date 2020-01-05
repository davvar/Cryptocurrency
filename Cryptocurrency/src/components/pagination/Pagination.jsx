import React from "react";

import "./Pagination.css";
import { withRouter } from "react-router-dom";

const Pagination = ({ currentPage, pages, history }) => {
  
  const activePage = page =>
    +currentPage === page
      ? { background: "rgb(12, 110, 110)", color: "white" }
      : null;

  const paginate = page => () => {
    if (page <= pages && page >= 1) history.push(`${page}`);
  };

  return (
    <div className="Pagination">
      <button onClick={paginate(currentPage - 1)}>&larr;</button>
      {Array(pages)
        .fill(0)
        .map((NULL, index) => (
          <p
            key={index + 1}
            onClick={paginate(index + 1)}
            style={activePage(index + 1)}
          >
            {index + 1}
          </p>
        ))}
      <button onClick={paginate(+currentPage + 1)}>&rarr;</button>
    </div>
  );
};

export default withRouter(Pagination);
