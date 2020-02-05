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
            plants: [],
            timer: 1
        }
    }

    calculateWaterLevel = (lastDate, freq) => {
        const curDate = new Date();
        let diffInMs = curDate.getTime() - Date.parse(lastDate);
        let totalMsInterval = (1000*60*60*24) * freq;
        let percentage = (1 - diffInMs / totalMsInterval)*100;
        return percentage;
    }

    loadPlants = () => {
        axios.get('https://home-dashboard-eb1c4.firebaseio.com/plants.json')
        .then(res => {
            const fetchedPlants = [];
            for (let key in res.data) {
                // Calculate the water level 
                const percentage = this.calculateWaterLevel(res.data[key].lastWaterDate, res.data[key].waterFrequency);
                fetchedPlants.push({
                    ...res.data[key],
                    id: key,
                    percentage: percentage
                });
                this.setState({plants: fetchedPlants});
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    timer = () => {
        const updatedPlants = [];
        for (let key in this.state.plants) {
        let udpatedPercentage = this.calculateWaterLevel(this.state.plants[key].lastWaterDate, this.state.plants[key].waterFrequency);
        console.log('In timer, ' + udpatedPercentage);
        updatedPlants.push({
           ...this.state.plants[key],
           id: key,
           percentage: udpatedPercentage
        });    
        }
        this.setState({plants: updatedPlants});
    }

    componentDidMount () {
        this.loadPlants();
        this.interval = setInterval(() => this.timer(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    addPlantHandler = (newPlantName, waterFrequency) => {
        let currentPlants = this.state.plants;
        let newPlant = newPlantName;
        let date = new Date();
    
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
                imageUrl: "",
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
        //this.state.plants.map((plant) => (console.log('In render, ' + plant.percentage)));
        return(
            <Aux>
                <div className={PlantsBoardStyle.PlantsList}>
                {
                this.state.plants.map( plant => (
                    <Plant key={plant.id} 
                        plantName={plant.plantName} 
                        imageUrl={plant.imageUrl} 
                        date={plant.lastWaterDate} 
                        waterFrequency={plant.waterFrequency} 
                        waterLevel={plant.percentage}
                        reloadPlants={this.loadPlants}>
                    </Plant>
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