import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";

const CurrencyInfo = ({
  match,
  fetchingData,
  history,
  currentPage,
  currenciesPerPage
}) => {
  const [currency, setCurrency] = useState({});
  const { id: curr_id, } = match.params; 


  useEffect(() => {
    fetchingData(currentPage, currenciesPerPage).then(currencies => {
      let found = currencies.find(({ id }) => id === curr_id);

      setCurrency(found);
    });
  }, [curr_id, currenciesPerPage, fetchingData, currentPage]);

  return (
    <Jumbotron style={{ color: "black" }}>
      <h4>Currency {currency.name}</h4>
      <h3>Reviews</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. At asperiores
        maxime odio et rerum hic, neque sapiente cumque ratione, deleniti harum,
        ad quidem! Officiis, culpa. Provident praesentium et perferendis
        veritatis similique maxime. Fugiat, ab tempora. Sapiente alias modi sunt
        consequuntur.
      </p>
      <button onClick={() => history.replace("/")}>back</button>
    </Jumbotron>
  );
};

export default CurrencyInfo;
