import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Plant from '../components/Plants/Plant';
import PlantsBoardStyle from './PlantsBoard.module.css';


class PlantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plants: {
                aloe: "some date saved on server or local storage",
                pepper: "some date saved on server or local storage"
            }
        }
    }
    
    addPlantHandler = () => {
        let currentPlants = this.state.plants;
        let newPlant = this.refs.input.value;
        
        // Check duplicate plant name
        if (!currentPlants.hasOwnProperty(newPlant)) {
            currentPlants[newPlant] = new Date().toISOString().slice(0, 10);
            this.setState({currentPlants});
        } else {
            alert("Plant name already exist. Please enter a unique name!")
        }
    }
    
    render() {
        return(
            <Aux>
                <div className={PlantsBoardStyle.PlantsList}>
                {// Key is unique plant name
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