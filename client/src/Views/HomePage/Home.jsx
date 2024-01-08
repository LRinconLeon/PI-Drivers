//import React from "react";
import Cards from "../../Components/CardsContainer/Cards";
import style from "./Home.module.css"
import { changePage, getDrivers } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const dispatch = useDispatch();

    const drivers = useSelector(state => state.drivers);
    const currentPage = useSelector(state => state.currentPage);

    useEffect(() => {
        dispatch(getDrivers());
    }, [dispatch]);

    const pagination = (event) => {
        dispatch(changePage(event.target.name)) //"prev" || "next"
    };

    return (
        <div>
            <div>
                <h3>currentPage: {currentPage + 1}</h3>
            </div>
            <div>
                <button onClick={pagination} name="prev">{"<<"}</button>
                <div>
                    {"1,2,3,4,5"}
                </div>
                <button onClick={pagination} name="next">{">>"}</button>
            </div>
            <div>
                {drivers.length > 0 ? (
                    <div>
                        <Cards drivers={drivers} />
                    </div>
                ) : ( <p className={style.loading}>Loading...</p> )}
            </div>
        </div>
    )
};

export default Home;

//* NOTAS:

//? useSelector:
/* La función useSelector se utiliza en componentes funcionales de React para seleccionar
y acceder a partes específicas del estado global almacenado en el store de Redux. En 
lugar de acceder directamente al estado global utilizando store */