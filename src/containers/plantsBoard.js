import React, { Component } from 'react';
import Aux from '../hoc/Aux/Aux';
import PlantsList from '../components/Plants/PlantsList';
import PlantsControls from '../components/ItemControls/PlantsControls';

class PlantsBoard extends Component {

    state = {
        plants: {
            aloe: 1,
            pepper: 2
        }
    }

    addPlantHandler = () => {
        const updatedPlants = {...this.state.plants};
        updatedPlants["newPlant"] = 0;
        this.setState({plants: updatedPlants});
    }

    render() {
        return(
            <Aux>
                <PlantsList plants={this.state.plants}></PlantsList>
                <PlantsControls addPlant={this.addPlantHandler}></PlantsControls>
            </Aux>
        )
    }  
}

export default PlantsBoard;