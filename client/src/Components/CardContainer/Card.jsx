import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ props }) => {
    return(
        <div className={style.card}>
            <img className={style.image} src={props.image} alt={`Pic of ${props.forename} ${props.surename}`} />
            <h1 className={style.name}>{props.forename} {props.surname}</h1>
            <h2 className={style.team}>Teams: {props.Teams?.map((team) => team.name).join(", ") + "."}</h2>
            <Link to={`/detail/${props.id}`}>
                <button className={style.btn}>READ MORE</button>
            </Link>
        </div>
    )
};

export default Card;