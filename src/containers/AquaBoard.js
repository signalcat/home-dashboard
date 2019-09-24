import React, { Component } from 'react';
import Fish from './Fish';
import LastDateObject from './LastDateObject';
import axios from '../hoc/axios';
import classes from './AquaBoard.module.css';


class AquaBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount () {
        this.loadAquaItems();
    }

    loadAquaItems = () => {
        axios.get('https://home-dashboard-eb1c4.firebaseio.com/aquaItems.json')
        .then(res => {
            console.log(res.data); 
            const fetchedItems = [];
            for (let key in res.data) {
                fetchedItems.push({
                    ...res.data[key],
                    id: key
                });
                this.setState({items: fetchedItems});
            }
        })
        .catch(error => {

        });
    }

    addAquaItemHandler = () => {
        let currentItems = this.state.items;
        let newItem = this.refs.input1.value;
        let newAction = this.refs.input2.value;

        if (newItem !== "" && newAction !== "") {
            let date = new Date().toISOString().slice(0, 10);

            // Check duplicate or empty plant name
            
            if (this.checkDuplicate(currentItems, newItem)) {
                 alert("Item " + newItem + " already exist. Please enter a unique name!")
            } else {
            // Store in DB
            const item = {
                name: newItem,
                action: newAction,
                lastDate: date
            }

            axios.patch('/aquaItems.json', {[newItem] : item} )
                .then(response => {
                    this.loadAquaItems();
                })
                .catch(error => {
                    console.log(error)
                })
            }

        } else {
            alert("Please enter both name and action!")
        }
    }

    checkDuplicate = (items, name) => {
        let duplicate = false;
        items.forEach( (item) => {
            if (item.name === name) duplicate = true;
        })
        return duplicate;
    }

    render() {
        return (
            <div className={classes.AquaBoard}>
                <h1>My Aquarium</h1>
                <label>Name</label><input ref="input1"/>
                <label>Action</label><input ref="input2"/>
                <button onClick={this.addAquaItemHandler}>Add an item</button>
                {this.state.items.map (item => (
                <LastDateObject 
                    key={item.id} 
                    objectName={item.name} 
                    date={item.lastDate}
                    action={item.action}></LastDateObject>
                ))}
                {/* <LastDateObject objectName="Aquarium" action="water changed" date="2019-03-20"></LastDateObject> */}
                <Fish fishName="Betta" fedTimes="1"></Fish>
                {/* <LastDateObject objectName="Snails" action= "fed" date="2019-03-20"></LastDateObject> */}
            </div>
        );
    }
}

export default AquaBoard;