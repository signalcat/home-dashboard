import React, { Component } from 'react';
import {storage} from '../../components/Firebase/index';
import classes from './ImageUpload.module.css';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: ''
        };
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
                        console.log(url);
                        this.setState({url: url});
                    }
                )
            });

    }
    render () {
        return (
            <div>
            <img alt="plantImage" className={classes.PlantImage} src={this.state.url}></img>
            <input type="file" onChange={this.selectFile}></input>
            <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}

export default ImageUpload;


