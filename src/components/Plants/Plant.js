import React, {Component} from 'react';
import classes from './Plant.module.css'
import axios from '../../hoc/axios';

class Plant extends Component {
    
    state = {
        date: this.props.date
    }

    updateDateHandler = () => {
        let today = new Date().toISOString().slice(0, 10)
        this.setState({date: today});
    }

    deletePlantHandler = (plantName) => {
        alert("You are going to delete plant " + plantName);
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants.json', 
        {[plantName]:null}
        )
        .then(res => {console.log(res); console.log(res.data);})
    }

    render() {
        return (
        <div className={classes.PlantBox}>
            <div className={classes.PlantInfo}>Plant Name: {this.props.plantName} <br/>
            Last Water Date: {this.state.date}</div>
            <button onClick={this.updateDateHandler}>I watered today!</button>
            <button onClick={this.deletePlantHandler.bind(this, this.props.plantName)}>Delete</button>
        </div>
        )
    }
}

export default Plant;