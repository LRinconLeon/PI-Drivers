//import React from "react";
import style from "./Landing.module.css"
import { Link } from 'react-router-dom'

const Landig = () => {
    return (
        <div className={style.divContainer}>
            <div className={style.divTop}>
                <h1>Discover and Learn all about F1</h1>
                <h1>You can create your own Driver</h1>
            </div>
            <div className={style.divButtom}>
                <p>Explore a wide variety of Drivers and Teams of F1.</p>
                <Link to='/home'><button className={style.btn}>LET'S GO!</button></Link>
            </div>
        </div>
    )
};

export default Landig;