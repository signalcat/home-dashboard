import React, {Component} from 'react';
import classes from './Plant.module.css'
import axios from '../../hoc/axios';
import Dropdown from '../Controls/dropdown';
import {storage} from '../../components/Firebase/index';
import watercan from '../../assets/watercan.svg';
import placeHolderImg from '../../assets/placeHolder.svg';

class Plant extends Component {
    
    state = {
        date: this.props.date,
        image: null,
        imageUrl: this.props.imageUrl,
        showPlant: true,
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
            const image = e.target.files[0];
            this.setState({image: image});
            this.handleUpload(image);
        }
    }

    handleUpload = (image) => {
        const imageName = image.name;
        const uploadTask = storage.ref(`images/${imageName}`).put(image);
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
        this.setState({showUploadBtn: !this.state.showUploadBtn});    
    }

    render() {

        let btnSelectFile;
        let placeHolder;

        // Display place holder image
        if (this.state.imageUrl === "") {
            placeHolder = <label htmlFor='file-input'><img src={placeHolderImg}/></label>
            btnSelectFile = <input id="file-input" className={classes.btnChooseFile} type="file" onChange={this.selectFile}></input>
        }
    
        return (
                <div className={classes.PlantBox}>
                    <Dropdown deletePlant={this.deletePlantHandler} selectPhoto={this.selectFile}></Dropdown>
                    <div className={classes.PlantInfo}> 
                        <p className={classes.plantName}>{this.props.plantName} <br/></p> 
                        <img className={classes.PlantImage} src={this.state.imageUrl}></img>
                            {placeHolder}{btnSelectFile}
                        <div className={classes.plantDetails}>
                            <p>Last Watered at: {this.state.date}</p>
                            <p>Water every {this.props.waterFrequency} days</p>
                        </div>    
                    </div>
                    <input type="image" onClick={this.updateDateHandler} className={classes.watercan} src={watercan}></input>
                </div> 
        )
    }
}

export default Plant;