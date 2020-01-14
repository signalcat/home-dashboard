import React, { Component } from "react";
import classes from './modal.module.css';

export default class Modal extends Component {
    
    state = {
            waterFrequency: '2'
    };


    handleInputChange = (event) => {
        this.setState({waterFrequency: event.target.value});
    }
    
    cancel = () => {
        this.props.onClose();
    }
    
    add = () => {
        this.props.onAdd(this.refs.input.value, this.state.waterFrequency);
    }

    render () {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className={classes.modal}>
                <div className={classes.modalContent}>
                    <div>{this.props.children}</div>
                    <h1 className={classes.title}>Congrats on your new plant!</h1>
                    <label className={classes.label}>Name your new plant:</label><br></br>
                    <input ref="input" placeholder="plant name" className={classes.input}></input><br></br>
                    <label className={classes.label}>How often does it need to be watered?</label><br></br>
                    <select value={this.state.value} onChange={this.handleInputChange}>
                        <option value='2'>every 2 days</option>
                        <option value='4'>every 4 days</option>
                        <option value='6'>every 6 days</option>
                        <option value='12'>every 12 days</option>
                        <option value='20'>every 20 days</option>
                    </select><br></br><br></br>
                    <button onClick={this.add} className={classes.btnAdd}>Add</button>
                    <button onClick={this.cancel} className={classes.btnCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}
