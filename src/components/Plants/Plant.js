import React, {Component} from 'react';
import classes from './Plant.module.css'
import axios from '../../hoc/axios';
import Dropdown from '../Controls/dropdown';
import ImageUpload from '../../containers/ImageUpload/ImageUpload';
import watercan from '../../assets/watercan.svg';

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
            <Dropdown plantName={this.props.plantName}></Dropdown>
            <div className={classes.PlantInfo}> 
                <p className={classes.plantName}>{this.props.plantName} <br/></p> 
                <img alt="No image uploaded" ></img>
                <ImageUpload></ImageUpload>
                <p>Last Water Date: {this.state.date}</p>
            </div>
            <input type="image" onClick={this.updateDateHandler} className={classes.watercan} src={watercan}></input>
        </div>
        )
    }
}

export default Plant;