import React, {Component} from 'react';
import classes from './ProgressBarFiller.module.css'

class Filler extends Component {
    render() {
        return (
            <div className={classes.Filler} style={{width: `${this.props.percentage}%`}}></div>
        );
    }
        
}

export default Filler;