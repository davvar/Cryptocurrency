import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";
import CurrencyInfo from "./components/currency-info/CurrencyInfo";

const BASE_URL = "https://api.udilia.com/coins/v1/cryptocurrencies";



const sorting = (data, sortBy, sortOrder) =>
  data.sort((a, b) =>
    sortOrder
      ? +a[sortBy].replace(/[,.]/g, "") - +b[sortBy].replace(/[,.]/g, "")
      : +b[sortBy].replace(/[,.]/g, "") - +a[sortBy].replace(/[,.]/g, "")
  );



function App({ match, history }) {
  // STATE
  const [currencies, setCurrencies] = useState([]);
  const [totalPagesCount, setTotalPagesCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(match.params.page || 1);
  const [currenciesPerPage, setCurrenciesPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState(true);
  const [sortedBy, setSortedBy] = useState("rank");
  const [searching, setSearching] = useState(false);


  const fetchData = useCallback(
    (page = 1, perPage = 20) => {
      return fetch(`${BASE_URL}?page=${page}&perPage=${perPage}`)
        .then(res => res.json())
        .then(({ currencies, totalCurrencies }) => {
          setTotalPagesCount(totalCurrencies / perPage);
          return sorting(currencies, sortedBy, sortOrder);
        });
    },
    [sortedBy, sortOrder]
  );

  useEffect(() => {
    fetchData(match.params.page, currenciesPerPage).then(setCurrencies);
    setCurrentPage(match.params.page);
  }, [match.params.page, currenciesPerPage, sortOrder, fetchData]);

  const handleSearch = e => {
    const { value: searchedSymbols } = e.target;

    const findingCurrencies = data => {
      return data.filter(({ name }) =>
        name.toLowerCase().startsWith(searchedSymbols.toLowerCase())
      );
    };
    searchedSymbols ? setSearching(true) : setSearching(false);

    //searching through all database
    let searchInAllData = new Promise((res, rej) => {
      !searchedSymbols ? rej() : res(fetchData(1, 50));
    });

    searchInAllData
      .then(findingCurrencies)
      .then(res1 =>
        fetchData(2, 50).then(cur => {
          let res2 = findingCurrencies(cur);
          setCurrencies([...res1, ...res2]);
        })
      )
      .catch(() =>
        fetchData(match.params.page, currenciesPerPage).then(setCurrencies)
      );
  };

  const changeCurrenciesPerPage = perPage => () => {
    // Finding the page with the same first currency
    // not to start pagination from the beginning
    let firstCurrencyOfPage = (currentPage - 1) * currenciesPerPage + 1;
    let newPage = 1; // Page with the same first currency
    while (newPage * perPage < firstCurrencyOfPage) {
      newPage++;
    }
    history.push("/" + newPage);
    setCurrentPage(match.params.page);
    setCurrenciesPerPage(perPage);
  };

  const handleSort = sortBy => () => {
    // if for example was sorted by rank and now
    // sorting by price no need to change order
    if (sortedBy === sortBy) {
      setSortOrder(prevOrder => !prevOrder);
    }
    setSortedBy(sortBy);
    setCurrencies(sorting(currencies, sortBy, sortOrder));
  };

  return (
    <div>
      <Header
        changeCurrenciesPerPage={changeCurrenciesPerPage}
        perPage={currenciesPerPage}
        currenciesPerPage={currenciesPerPage}
        handleSearch={handleSearch}
      />
      <Route
        path="/productId=:id?"
        render={withRouter => (
          <CurrencyInfo
            {...withRouter}
            currentPage={currentPage}
            fetchData={fetchData}
          />
        )}
      />
      <Table
        handleSort={handleSort}
        sortedBy={sortedBy}
        sortOrder={sortOrder}
        currencies={currencies}
      />
      {!searching && (
        <Pagination pages={totalPagesCount} currentPage={currentPage} />
      )}
    </div>
  );
}

export default withRouter(App);
