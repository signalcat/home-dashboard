import React from 'react';
import Plant from '../Plants/Plant'

const plantsList = (props) => {

    return (
        <div>
            {
                // Key is unique plant name
                Object.keys(props.plants).map( key => {
                    return <Plant key={key} plantName={key} date={props.plants[key]}></Plant>
                })}
        </div>
    );
};

export default plantsList;