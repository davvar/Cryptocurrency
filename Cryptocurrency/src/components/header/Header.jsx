import React from 'react';
import "./Header.css";
import logo from './logo.png'
import Search from '../search/Search';
import CurrenciesPerPage from './../currenciesPerPage/CurrenciesPerPage';

const Header = ({ handleSearch, perPage, changeCurrenciesPerPage }) => {
  return (
    <div className="Header">
      <img src={logo} alt="" className="Header-logo" />
      <Search handleSearch={handleSearch} />
      <CurrenciesPerPage
        changeCurrenciesPerPage={changeCurrenciesPerPage}
        perPage={perPage}
      />
    </div>
  );
};
 
export default Header;