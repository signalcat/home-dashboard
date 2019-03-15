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
        <div className={classes.PlantBox}>
            <div className={classes.PlantInfo}>Plant Name: {this.props.plantName} <br/>
            Last Water Date: {this.state.date}</div>
            <button onClick={this.updateDateHandler}>I watered today!</button>
        </div>
        )
    }
}

export default Plant;