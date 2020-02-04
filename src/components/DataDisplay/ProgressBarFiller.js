import React, {Component} from 'react';
import classes from './ProgressBarFiller.module.css'

class Filler extends Component {
    render() {
        console.log('in progress bar, percentage: ' + this.props.percentage);
        const displayPercentage = (this.props.percentage < 0) ? 0 : this.props.percentage; 
        return (
            <div className={classes.Filler} style={{width: `${displayPercentage}%`}}></div>
        );
    }       
}
export default Filler;