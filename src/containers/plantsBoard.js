import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import classes from './PlantsBoard.module.css'
import Plant from '../components/Plants/Plant';


class PlantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plants: {
                aloe: 1,
                pepper: 2
            }
        }
    }
    
    addPlantHandler = () => {
        const object = this.state.plants;
        let newPlant = this.refs.input.value;
        object[newPlant] = 0;
        this.setState({object});
    }
    
    render() {
        return(
            <Aux>
                <div>
                {
                // Key is unique plant name
                Object.keys(this.state.plants).map( key => {
                    return <Plant key={key} plantName={key} date={this.state.plants[key]}></Plant>
                })}</div>

                 <input ref="input"/>
                 <button onClick={this.addPlantHandler}>Add Plant</button><br /><br />
            </Aux>
        )
    }  
}

export default PlantsBoard;