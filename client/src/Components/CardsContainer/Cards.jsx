import React from 'react';
import style from './Cards.module.css';
import Card from '../CardContainer/Card';

const Cards = ({ drivers }) => {
    return(
        <div className={style.cards}>
            {drivers.map((driver) => <Card key={driver.id} props={driver} />)}
        </div>
    );
};

export default Cards;