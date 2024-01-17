//import React from "react";
import Cards from "../../Components/CardsContainer/Cards";
import style from "./Home.module.css"
import { changePage, filterBySource, filterByTeams, getByTeams, getDrivers, orderByABC, orderByDOB, restart } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const dispatch = useDispatch();

    const drivers = useSelector(state => state.drivers);
    const teams = useSelector(state => state.teams);
    const currentPage = useSelector(state => state.currentPage);

    //* HOOKS 
    
    useEffect(() => {
        dispatch(getDrivers());
        dispatch(getByTeams());
    }, [dispatch]);

    //* PAGINATION

    const pagination = (event) => {
        dispatch(changePage(event.target.name)); 
    };

    //* FILTROS

    const filterSource = (event) => {
        dispatch(filterBySource(event.target.value)); 
    };

    const filterByTeam = (event) => {
        dispatch(filterByTeams(event.target.value))
    };

    //* ORDENAMIENTOS

    const orderHandler = (event) => {
        dispatch(orderByABC(event.target.value))
    } 

    const DOBHandler = (event) => {
        dispatch(orderByDOB(event.target.value));
    };

    //* BOTON DE LIMPIAR LOS FILTROS

    const reset = () => {
        dispatch(restart());
    };

    return (
        <div className={style.container}>
            <div className={style.filters}>
                <h3>FILTER BY: </h3>
                <select onChange={filterSource}>
                    <option value="API">API Drivers</option>
                    <option value="DB">DB Drivers</option>
                </select>

                <select onChange={filterByTeam}> 
                    <option>Team</option>
                    {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option>)}
                </select>
            </div>

            <div className={style.orders}>
                <h3>ORDER BY: </h3>
                <select onChange={orderHandler}>
                    <option>Abecedary</option>
                    <option value="A">A to Z</option>
                    <option value="D">Z to A</option>
                </select>
                <select onChange={DOBHandler}>
                    <option>Day Of Birth</option>
                    <option value="Higher">Higher</option>
                    <option value="Lower">Lower</option>
                </select>
            </div>

            <h4 className={style.rest}>RESTART</h4>
            <button className={style.btnRest} onClick={reset}>Restart</button>

            <div>
                {drivers.length > 0 ? (
                    <div>
                        <Cards drivers={drivers} />
                    </div>
                ) : ( <p className={style.loading}>Loading...</p> )}
            </div>

            <div className={style.pagination}> 
                <div>
                    <button className={style.btn} onClick={pagination} name="prev">{"<<"}</button>
                    <span className={style.pageNumber}>{currentPage + 1}</span>
                    <button className={style.btn} onClick={pagination} name="next">{">>"}</button>
                </div>
            </div>
        </div>
    );
};

export default Home;

//* NOTAS:

//? useSelector:
/* La función useSelector se utiliza en componentes funcionales de React para seleccionar
y acceder a partes específicas del estado global almacenado en el store de Redux. En 
lugar de acceder directamente al estado global utilizando store */