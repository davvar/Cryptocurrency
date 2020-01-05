import React, { useState, useEffect } from "react";
import "./Table.css";
import TableBody from "./tableBody/TableBody";
import TableHeader from "./tableHeader/TableHeader";
import Loading from "./../loading/Loading";

const Table = ({ currencies, handleSort, sortedBy, sortOrder }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (currencies.length) setLoaded(true);
  }, [currencies]);

  if (!loaded) return <Loading />;

  return (
    <div className="Table-container">
      <table className="Table">
        <TableHeader
          sortedBy={sortedBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
          currencies={currencies}
        />
        <TableBody currencies={currencies} />
      </table>
    </div>
  );
};

export default Table;
