import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import CoinSelector from "./components/CoinSelector";
import SelectedChart from "./components/SelectedChart";

import "./styles.scss";

const App = () => {
  const [coinData, setCoinData] = useState([]);
  const [coin, setCoin] = useState("");
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log("Coin: ", coin);

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`)
      .then(res => {
        setSelectedData(res.data.prices);
      })
      .catch(err => console.log(`Error fetching ${coin.name} data:\n`, err));
  }, [coin])

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData])

  return (
    <div className="App">
      <Navbar />
      <CoinSelector coin={coin} setCoin={setCoin} />
      {selectedData.length ? <SelectedChart coin={coin} data={selectedData} /> : <></>}
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
