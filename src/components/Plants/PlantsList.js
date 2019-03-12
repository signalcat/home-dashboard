import React from 'react';
import Plant from '../Plants/Plant'

const plantsList = (props) => {

    return (
        <div>
            {
                Object.keys(props.plants).map( key => {
                    return <Plant plantName={key} date={props.plants[key]}></Plant>
                })}
        </div>
    );
};

export default plantsList;