//import React from "react";
import style from "./Landing.module.css"
import { Link } from 'react-router-dom'

const Landig = () => {
    return (
        <>
        <div className={style.divContainer}>
            <img className={style.img} src="https://1000marcas.net/wp-content/uploads/2020/01/logo-F1.png" alt="f1" />
            <div className={style.divTop}>
                <h1>Exciting Discoveries and Learning in the World of F1</h1>
                <h1>Ever dreamed of creating your own F1 Driver?</h1>
            </div>
            <div className={style.divButtom}>
                <h3>Dive into the fascinating world of iconic Drivers and legendary Teams.</h3>
            </div>
            <Link to='/home'><button className={style.btn}>Start Racing</button></Link>
        </div>
        </>
    )
};

export default Landig;