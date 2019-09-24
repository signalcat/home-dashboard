import React, { Component } from 'react';
import classes from "./AquaBoard.module.css";

class LastDateObject extends Component {
    render () {
        return (
        <div className={classes.AquaItem}>
            {this.props.objectName} last {this.props.action} date: {this.props.date}
            <button>{this.props.action}</button>
        </div>
        );
    }
} 

export default LastDateObject;