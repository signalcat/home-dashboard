import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import Plant from '../components/Plants/Plant';
import PlantsBoardStyle from './PlantsBoard.module.css';
import axios from '../hoc/axios';
import plusSign from '../assets/plus.svg'
import Modal from '../components/Controls/modal';
import modalStyle from '../components/Controls/modal.module.css';

class PlantsBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            newPlant: "",
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
    
    addPlantHandler = (newPlantName, waterFrequency) => {

        console.log(waterFrequency);

        let currentPlants = this.state.plants;
        let newPlant = newPlantName;
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
                waterFrequency: waterFrequency,
                lastWaterDate: date,
                imageUrl: ""
            }
            axios.patch('/plants.json', {[newPlant] : plant} )
                .then(response => {
                    this.loadPlants();
                })
                .catch(error => {
                })
            this.toggleModal();
        }
    }

    checkDuplicate = (plants, name) => {
        let duplicate = false;
        plants.forEach( (plant) => {
            if (plant.plantName === name) duplicate = true;
        })
        return duplicate;
    }

    toggleModal = () => {
        let newState = Object.assign({}, this.state);
        newState.show = !this.state.show;
        this.setState(newState);
    }
    
    render() {
        return(
            <Aux>
                <div className={PlantsBoardStyle.PlantsList}>
                {
                this.state.plants.map( plant => (
                    <Plant key={plant.id} plantName={plant.plantName} waterFrequency={plant.waterFrequency} date={plant.lastWaterDate} imageUrl={plant.imageUrl} postDeletion={this.loadPlants}></Plant>
                ))}
                <div className={PlantsBoardStyle.AddPlant}>
                    <input type="image" src={plusSign}  className={PlantsBoardStyle.plusSign} onClick={this.toggleModal}></input>
                </div> 

                <Modal onClose={this.toggleModal} show={this.state.show} onAdd={this.addPlantHandler}>
                </Modal>
                </div>
                
            </Aux>
        );
    }  
}

export default PlantsBoard;