import React, { Component } from 'react';

class LastDateObject extends Component {
    render () {
        return (
        <div>
            {this.props.objectName} last {this.props.action} date: {this.props.date}
            <button>{this.props.action}</button>
        </div>
        );
    }
} 

export default LastDateObject;