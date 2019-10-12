import React, {Component} from 'react';
import classes from './dropdown.module.css';
import dots from '../../assets/dots.svg';
import axios from '../../hoc/axios';

// // <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.0.0/firebase-app.js"></script>

// // <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// // <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>

class Dropdown extends Component {
    constructor() {
        super();
        
        this.state = {
            displayMenu: false,
        };
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
                        <li onClick={this.props.action}>Delete</li>
                    </ul>
                    ) : null
                }
            </div>
        );
    }
}

export default Dropdown;