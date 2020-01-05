import React from "react";
import { ButtonToolbar, DropdownButton, Dropdown } from "react-bootstrap";

const CurrenciesPerPage = ({ perPage, changeCurrenciesPerPage }) => {
  return (
    <ButtonToolbar className="ButtonToolbar">
      <DropdownButton size="sm" title="per page" variant="secondary">
        {[10, 20, 50].map(num => (
          <Dropdown.Item
            onClick={changeCurrenciesPerPage(num)}
            active={perPage === num}
            style={{ display: "inline" }}
            key={num}
          >
            {num}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </ButtonToolbar>
  );
};

export default CurrenciesPerPage;
