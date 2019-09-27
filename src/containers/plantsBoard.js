import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Plant from '../components/Plants/Plant';
import PlantsBoardStyle from './PlantsBoard.module.css';
import axios from '../hoc/axios';

class PlantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plants: []
        }
    }

    loadPlants = () => {
        axios.get('https://home-dashboard-eb1c4.firebaseio.com/plants.json')
        .then(res => {
            const fetchedPlants = [];
            for (let key in res.data) {
                fetchedPlants.push({
                    ...res.data[key],
                    id: key
                });
                this.setState({plants: fetchedPlants});
            }
        })
        .catch(error => {
        });
    }

    componentDidMount () {
        this.loadPlants();
    }
    
    addPlantHandler = () => {
        let currentPlants = this.state.plants;
        let newPlant = this.refs.input.value;
        let date = new Date().toISOString().slice(0, 10);
    
        // Check duplicate or empty plant name
        if (newPlant === "") {
            alert("Plant name can't be empty.")
          } else if (this.checkDuplicate(currentPlants, newPlant)) {
            alert("Plant " + newPlant + " already exist. Please enter a unique name!")
        } else {
            // Store in DB
            const plant = {
                plantName: newPlant,
                lastWaterDate: date
            }
            axios.patch('/plants.json', {[newPlant] : plant} )
                .then(response => {
                    this.loadPlants();
                })
                .catch(error => {
                })
        }
    }

    checkDuplicate = (plants, name) => {
        let duplicate = false;
        plants.forEach( (plant) => {
            if (plant.plantName === name) duplicate = true;
        })
        return duplicate;
    }
    
    render() {
        return(
            <Aux>
                <div className={PlantsBoardStyle.AddPlant}>
                    <input ref="input"/>
                    <button onClick={this.addPlantHandler}>Add Plant</button><br /><br />
                </div> 
                <div className={PlantsBoardStyle.PlantsList}>
                {
                this.state.plants.map( plant => (
                    <Plant key={plant.id} plantName={plant.plantName} date={plant.lastWaterDate}></Plant>
                ))}
                </div>
            </Aux>
        );
    }  
}

export default PlantsBoard;