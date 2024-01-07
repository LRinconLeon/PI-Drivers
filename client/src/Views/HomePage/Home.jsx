//import React from "react";
import Cards from "../../Components/CardsContainer/Cards";
import { getDrivers } from "../../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
    const dispatch = useDispatch();

    const drivers = useSelector(state => state.drivers);

    useEffect(() => {
        dispatch(getDrivers());
    }, []);

    return (
        <div>
            <div>
                {drivers.length > 0 ? (
                    <div>
                        <Cards drivers={drivers} />
                    </div>
                ) : ( <p>Loading...</p> )}
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