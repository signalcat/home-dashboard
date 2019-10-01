import React, { Component } from 'react';
import {storage} from '../../components/Firebase/index';

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
            const image = e.target.files[0];
            this.setState({image: image});
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
                })
            });

    }
    render () {
        return (
            <div>
            <input type="file" onChange={this.selectFile}></input>
            <button onClick={this.handleUpload}>Upload</button>
            </div>
        )
    }
}

export default ImageUpload;


