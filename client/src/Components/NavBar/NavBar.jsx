//import React from "react";
import { Link } from "react-router-dom";
import style from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    return(
        <div className={style.navBar}>
            <Link to='/home'>HOME</Link>
            <Link to='/'>LANDING</Link>
        </div>
    )
};

const NavBarHome = () => {
    return(
        <div className={style.navHome}>
            <Link to='/'>LANDING</Link>
            <SearchBar />
            <Link to='/create'>FORM</Link>
            <Link to='/home'>HOME</Link>
        </div>
    )
};

export {
    NavBar,
    NavBarHome
};