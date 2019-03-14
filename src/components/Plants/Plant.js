import React, {Component} from 'react';
import classes from './Plant.module.css'

class Plant extends Component {
    
    state = {
        date: this.props.date
    }

    updateDateHandler = () => {
        let today = new Date().toISOString().slice(0, 10)
        this.setState({date: today});
    }

    render() {
        return (
        <div className={classes.Plant}>
            <div>PlantName: {this.props.plantName} <br/>
            LastWaterDate: {this.state.date}</div>
            <button className={classes.UpdateWaterDateButton} onClick={this.updateDateHandler}>I watered today!</button>
        </div>
        )
    }
}

export default Plant;