//import React from "react";
import { Link } from "react-router-dom";
import style from './NavBar.module.css';
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    return(
        <div className={style.navBar}>
            <Link to='/'><img className={style.img} src="https://www.thedesignfrontier.com/wp-content/uploads/2019/05/f1-logo-big.png" alt="f1" /></Link>
            <Link to='/home' className={style.createDriverLink}>HOME</Link>
        </div>
    )
};

const NavBarHome = () => {
    return(
        <div className={style.navHome}>
            <Link to='/'><img className={style.img} src="https://www.thedesignfrontier.com/wp-content/uploads/2019/05/f1-logo-big.png" alt="f1" /></Link>
            <SearchBar />
            <Link to='/create' className={style.createDriverLink}>CREATE YOUR OWN DRIVER</Link>
        </div>
    )
};

export {
    NavBar,
    NavBarHome
};