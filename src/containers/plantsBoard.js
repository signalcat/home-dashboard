import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Plant from '../components/Plants/Plant';
import PlantsBoardStyle from './PlantsBoard.module.css';


class PlantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plants: {
                aloe: "XXXX-XX-XX",
                pepper: "XXXX-XX-XX"
            }
        }
    }
    
    addPlantHandler = () => {
        let currentPlants = this.state.plants;
        let newPlant = this.refs.input.value;
        
        // Check duplicate or empty plant name
        if (newPlant === "") {
            alert("Plant name can't be empty.")
        } else if (currentPlants.hasOwnProperty(newPlant)) {
            alert("Plant name already exist. Please enter a unique name!")
        } else {
            currentPlants[newPlant] = new Date().toISOString().slice(0, 10);
            this.setState({currentPlants});
        }
    }
    
    render() {
        return(
            <Aux>
                <div className={PlantsBoardStyle.PlantsList}>

                <div className={PlantsBoardStyle.AddPlant}>
                    <input ref="input"/>
                    <button onClick={this.addPlantHandler}>Add Plant</button><br /><br />
                </div> 
                
                {// Key is unique plant name
                Object.keys(this.state.plants).map( key => {
                    return <Plant key={key} plantName={key} date={this.state.plants[key]}></Plant>
                })}

                </div>

                
            </Aux>
        )
    }  
}

export default PlantsBoard;