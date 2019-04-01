import React, { Component } from 'react';

class Fish extends Component {
    render () {
        return (
            <div>
                Fish: {this.props.fishName} fed {this.props.fedTimes} times today!
                <button>Feed!</button>
            </div>
        )
    }
}

export default Fish;