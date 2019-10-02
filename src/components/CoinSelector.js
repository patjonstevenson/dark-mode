import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinSelector = ({ coin, setCoin }) => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selected, setSelected] = useState(coin);

    const handleSubmit = e => {
        e.preventDefault();
        setCoin(selected);
    }

    const handleChanges = e => {
        setSearch(e.target.value);
    }

    const handleSelection = e => {
        setSelected(JSON.parse(e.target.value));
    }

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins/list")
            .then(res => {
                setSearchResults(res.data.filter(c => c.name.includes(search)));
                console.log("Search term: ", search);
                console.log("Search results: ", searchResults);
            })
            .catch(err => console.log("Error fetching coins:\n", err));
    }, [search])

    useEffect(() => {
        console.log("Selected: ", selected);
    }, [selected])

    return (
        <div className="coin-selector">

            <input onChange={handleChanges} type="text" value={search} />

            <form id="coinselector" onSubmit={handleSubmit} ><button type="submit" >Select</button></form>
            <select form="coinselector" value={selected} onChange={handleSelection}>
                {searchResults.map(result => (
                    <option value={JSON.stringify(result)}>{result.name}</option>
                ))}
            </select>

        </div>
    );
}

export default CoinSelector;