import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cleanDetail, getDriverById } from "../../Redux/Actions/actions";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const drivers = useSelector(state => state.drivers);

    useEffect(() => {
        dispatch(getDriverById(id))
        return () => dispatch(cleanDetail()); // esto es para limpiar el estado global 
    }, [id, dispatch]);

    console.log("Drivers in Detail:", drivers);
    return (
        <div className={style.container}>
            <div className={style.cardContainer}>
                {drivers.length > 0  ? (
                    <>
                    <img className={style.img} src={drivers[0].image} alt={drivers[0].furename} />
                    <h1 className={style.name}>{drivers[0].forename} {drivers[0].surname}</h1>
                    <p className={style.information}>ID: {drivers[0].id}</p>
                    <p className={style.information}>Description: {drivers[0].description}</p>
                    <p className={style.information}>Nationality: {drivers[0].nationality}</p>
                    <p className={style.information}>Date of Birth: {drivers[0].dob}</p>
                    <p className={style.information}>Number: {drivers[0].number}</p>
                    <p className={style.information}>Teams: {drivers[0].Teams?.map((team) => team.name).join(", ") + "."}</p>
                    </>
                ) : (
                    <h3 className={style.loading}>Loading...</h3>
                )}
            </div>
        </div>
    )
};

export default Detail;