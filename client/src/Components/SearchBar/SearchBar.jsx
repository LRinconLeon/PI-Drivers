//import React from "react";
import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getByName } from "../../Redux/Actions/actions";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const inputHandle = (event) => {
        setName(event.target.value);
    };

    const submitHandle = (event) => {
        event.preventDefault();
        dispatch(getByName(name));
    };

    return (
        <div className={style.mainContainer}>
            <form onSubmit={submitHandle}>
                <input type="text" id="searchInput" onChange={inputHandle} placeholder="Search by Name" />
                <input type="submit" onClick={submitHandle} />
            </form>
        </div>
    )
};

export default SearchBar;