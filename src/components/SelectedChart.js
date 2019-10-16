import React from "react";
import Chart from "./Chart";
import moment from "moment";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

const SelectedChart = ({ coin, data }) => {
    console.log("Coin Info\n-------------");
    console.log("Coin Name: ", coin.name);
    console.log("Coin Symbol: ", coin.symbol);
    console.log("Coin ID: ", coin.id);
    console.log("Data:\n", data);
    const formattedData = data.map(instance => {
        return {
            "time": instance[0],
            "price": instance[1]
        }
    });
    return (
        <div className="charts">
            <div className="chart__container" key={coin.name}>
                <h2 className="coin__title">{coin.name}</h2>
                <h4 className="coin__symbol">{coin.symbol}</h4>
                <div className="coin__logo">
                    <img src={coin.image} height="40" alt={coin.name} />
                </div>
                <LineChart width={1100} height={300} data={formattedData}>
                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" interval={3} />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        </div>
    );
};
export default SelectedChart;
