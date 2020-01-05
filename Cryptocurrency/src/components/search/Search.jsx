import React from "react";
import search from "./search.png";
import "./Search.css";

const Search = ({ handleSearch }) => (
  <div className="Search">
    <img src={search} alt="" />
    <input onChange={handleSearch} type="text" placeholder="Currency name" />
  </div>
);

export default Search;
