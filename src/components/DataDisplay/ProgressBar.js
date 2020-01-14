import React, {Component} from 'react'
import classes from './ProgressBar.module.css';
import Filler from './ProgressBarFiller';

class ProgressBar extends Component {
    render() {
        return ( 
        <div className={classes.progressBar}>
          <Filler percentage={this.props.waterLevel}></Filler>
        </div>
        )
    }
}

export default ProgressBar;
