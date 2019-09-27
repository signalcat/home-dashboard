import React, {Component} from 'react';
import classes from './dropdown.module.css';
import dots from '../../assets/dots.svg';
import axios from '../../hoc/axios';

class Dropdown extends React.Component {
    constructor() {
        super();
        
        this.state = {
            displayMenu: false,
        };
    }

    deletePlantHandler = (plantName) => {
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants.json', 
        {[plantName]:null}
        )
        .then()
    }

    showDropdownMenu = (event) => {
        event.preventDefault();
        this.setState({ displayMenu: true}, ()=> {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu = () => {
        this.setState({ displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        })
    } 
        
    render () {
        return (
            <div className={classes.dropDown}>
                <input type="image" className={classes.option} src={dots}
                    onClick = {this.showDropdownMenu}></input>
                { this.state.displayMenu ? (
                    <ul className={classes.ul}>
                        <li onClick={this.deletePlantHandler.bind(this, this.props.plantName)}>Delete</li>
                    </ul>
                    ) : null
                }
            </div>
        );
    }
}

export default Dropdown;