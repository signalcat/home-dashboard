import React, {Component} from 'react';
import classes from './Plant.module.css'
import axios from '../../hoc/axios';
import Dropdown from '../Controls/dropdown';
import {storage} from '../../components/Firebase/index';
import watercan from '../../assets/watercan.svg';

class Plant extends Component {
    
    state = {
        date: this.props.date,
        image: null,
        imageUrl: this.props.imageUrl,
        showPlant: true
    }

    updateDateHandler = () => {
        let today = new Date().toISOString().slice(0, 10)
        this.setState({date: today});
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants/'+ this.props.plantName +'.json',
        {lastWaterDate: today}
        ).then()
    }

    deletePlantHandler = () => {
        alert("You are going to delete plant " + this.props.plantName);
        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants.json', 
        {[this.props.plantName]:null}
        )
        .then(
            this.props.postDeletion
        )
    }

    selectFile = (e) => {
        if (e.target.files[0]) {
            const imagePath = e.target.files[0];
            this.setState({image: imagePath});
        }
    }

    handleUpload = (e) => {
        const imageName = this.state.image.name;
        const uploadTask = storage.ref(`images/${imageName}`).put(this.state.image);
        uploadTask.on('state_changed', 
            (snapshot) => {

            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref('images').child(imageName).getDownloadURL().then(
                    url => {
                        this.setState({imageUrl: url});
                        axios.patch('https://home-dashboard-eb1c4.firebaseio.com/plants/'+ this.props.plantName +'.json', 
                            {imageUrl: url})
                            .then(response => {
                                console.log(response);
                                this.hideUpload();
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                )
            });

    }

    render() {
        const uploaded = this.state.imageUrl;
        let btnSelectFile;
        let btnUpload;

        if (uploaded === "") {
            btnSelectFile = <input type="file" onChange={this.selectFile}></input>
            btnUpload = <button onClick={this.handleUpload}>Upload</button>
        } else{
            btnSelectFile = null;
            btnUpload = null;
        }
        return (
                <div className={classes.PlantBox}>
                    <Dropdown deletePlant={this.deletePlantHandler} selectPhoto={this.selectFile}></Dropdown>
                    <div className={classes.PlantInfo}> 
                        <p className={classes.plantName}>{this.props.plantName} <br/></p> 
                        <img alt="plantImage" className={classes.PlantImage} src={this.state.imageUrl}></img>
                            {btnSelectFile}{btnUpload}
                        <p>Last Water Date: {this.state.date}</p>
                    </div>
                    <input type="image" onClick={this.updateDateHandler} className={classes.watercan} src={watercan}></input>
                </div> 
        )
    }
}

export default Plant;