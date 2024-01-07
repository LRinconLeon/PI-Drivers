import React from 'react';
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ props }) => {
    return(
        <div className={style.card}>
            <Link to={`/detail/${props.id}`}>
                <img className={style.image} src={props.image} alt={`Pic of ${props.forename} ${props.surename}`} />
                <h1 className={style.name}>{props.forename} {props.surname}</h1>
            </Link>
            <h2>Teams: {props.Teams?.map((team) => team.name).join(", ") + "."}</h2>
        </div>
    )
};

export default Card;