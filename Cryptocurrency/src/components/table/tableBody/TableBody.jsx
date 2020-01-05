import React from "react";
import { withRouter } from "react-router-dom";

const TableBody = ({ currencies /* history */ }) => (
  <tbody className="Table-body ">
    {currencies.map(
      ({ name, rank, price, marketCap, percentChange24h, id }) => {
        let change24h_color = {
          color: `${percentChange24h < 0 ? "red" : "green"}`
        };
        

        return (
          // <tr onClick={() => history.push(`/productId=${id}`)} key={id} id={id}>
          <tr onClick={() => {}} key={id} id={id}>
            <td>
              <span className="Table-rank"> {rank}</span> {name}
            </td>
            <td>
              <span className="Table-dollar">$</span> {price}
            </td>
            <td>
              <span className="Table-dollar">$</span>
              {marketCap}
            </td>

            <td style={change24h_color}>
              {percentChange24h}
              {percentChange24h >= 0 ? <i>&uarr;</i> : <i>&darr;</i>}{" "}
            </td>
          </tr>
        );
      }
    )}
  </tbody>
);
export default withRouter(TableBody);
