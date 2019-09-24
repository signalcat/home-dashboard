import React, {Component} from 'react';
import classes from './Plant.module.css'
import axios from '../../hoc/axios';
import dots from '../../assets/dots.svg';

class Plant extends Component {
    
    state = {
        date: this.props.date
    }

    updateDateHandler = () => {
        let today = new Date().toISOString().slice(0, 10)
        this.setState({date: today});
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants/'+ this.props.plantName +'.json',
        {lastWaterDate: today}
        ).then()
    }

    deletePlantHandler = (plantName) => {
        alert("You are going to delete plant " + plantName);
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants.json', 
        {[plantName]:null}
        )
        .then()
    }

    render() {
        return (
        <div className={classes.PlantBox}>
            <div className={classes.PlantInfo}> 
                <p className={classes.plantName}>{this.props.plantName} <br/></p>            
                <input type="image" className={classes.option} src={dots}></input>
            </div>
            Last Water Date: {this.state.date}
            <button onClick={this.updateDateHandler}>I watered today!</button>
            <button onClick={this.deletePlantHandler.bind(this, this.props.plantName)}>Delete</button>
        </div>
        )
    }
}

export default Plant;