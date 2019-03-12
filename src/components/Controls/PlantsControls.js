import React from 'react';
import classes from './PlantsControls.module.css';

const plantsControls = (props) => (
    <div>
        <label>
            Please input a unique plant name:
            <input className={classes.NewPlantInput}>
            </input>
        </label>
        
        <button 
            className={classes.AddButton}
            onClick={props.addPlant}
        > Add Plant</button>
    </div>
);

export default plantsControls;