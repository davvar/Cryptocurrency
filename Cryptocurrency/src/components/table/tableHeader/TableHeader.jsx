import React from "react";

const TableHeader = ({ handleSort, sortedBy, sortOrder }) => {
  const icon = sortOrder ? <i>&darr;</i> : <i>&uarr;</i>;

  let sections = [
    { title: "Cryptocurrency", category: "rank" },
    { title: "Price", category: "price" },
    { title: "Market Cap", category: "marketCap" },
    { title: "24H Change", category: "percentChange24h" }
  ];
  sections.forEach(s => (s.showIcon = () => s.category === sortedBy));

  return (
    <thead className="Table-head">
      <tr className="Table-head">
        {sections.map(({ title, category, showIcon }, i) => (
          <th key={i} onClick={handleSort(category)}>
            {title} {showIcon() && icon}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
