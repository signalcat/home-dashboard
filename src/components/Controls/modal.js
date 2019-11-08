import React, { Componenet } from "react";
import classes from './modal.module.css';

export default class Modal extends React.Component {
    cancel = () => {
        this.props.onClose();
    }
    
    add = () => {
        this.props.onAdd(this.refs.input.value);
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
                    <input ref="input" placeholder="plant name" className={classes.input}></input>
                    <button onClick={this.add} className={classes.btnAdd}>Add</button>
                    <button onClick={this.cancel} className={classes.btnCancel}>Cancel</button>
                </div>
            </div>
        )
    }
}
