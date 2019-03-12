import React from 'react';
import classes from './PlantsControls.module.css';

const plantsControls = (props) => (
    <div>
        <button 
            className={classes.AddButton}
            onClick={props.addPlant}
        > Add Plant</button>
    </div>
);

export default plantsControls;