import React from 'react';
import classes from './Plant.module.css'

const plant = (props) => (
    <div className={classes.Plant}>
        <div>PlantName: {props.plantName}</div>
        <div>LastWaterDate: {props.date} </div>
    </div>
);

export default plant;