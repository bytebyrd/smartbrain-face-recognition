import React, { Component } from 'react';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import ImageLinkForm from '../components/ImageLinkForm';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import ParticlesBg from 'particles-bg';
import Rank from '../components/Rank';
import Register from '../components/Register';
import SignIn from '../components/SignIn/SignIn';
import "./App.css";


const initialState = {
    imageUrl: "",
    boxes: [],
    route: "signin",
    isSignedIn: false,
    user: null
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }

    loadUser = (data) => {
        this.setState(() => ({ user: data }))
    }

    updateProfile = (id) => {
        fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id })
        })
            .then(res => res.json())
            .then(data => this.setState(prevState => ({ user: { ...prevState.user, entries: data } })))
    }
    calculateFaceLocation = (top, right, bottom, left) => {
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        //calculate the top left position of the bounding box
        const topRow = top * height;
        const leftCol = left * width;
        const rightCol = width - (right * width);
        const bottomRow = height - (bottom * height);
        return {
            topRow,
            leftCol,
            rightCol,
            bottomRow
        }
    }

    displayBox = (box) => {
        this.setState(() => ({ boxes: [box] }))
    }
    onInputChange = (e) => {
        this.setState(() => ({
            imageUrl: e.target.value,
            boxes: []
        }))
    }

    onRouteChange = (route) => {
        if (route === 'home') {
            this.setState(() => ({ isSignedIn: true }))
        } else {
            this.setState(() => (initialState))
        }
        this.setState(() => ({ route }))
    }
    onDetectImage = () => {
        this.predictImage(this.state.imageUrl);
    }

    predictImage(imageUrl) {
        fetch("http://localhost:3000/image", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                imageURL: imageUrl
            })

        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                const { bottom_row, left_col, right_col, top_row } = result.outputs[0].data.regions[0].region_info.bounding_box;
                this.displayBox(this.calculateFaceLocation(top_row, right_col, bottom_row, left_col));
                this.updateProfile(this.state.user.id)
            })
    }

    render() {
        const { imageUrl, route, boxes, isSignedIn } = this.state;
        return (
            <div>
                <ParticlesBg bg={true} color={"#ffffff"} num={32} type="cobweb" />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                {
                    route === "signin"
                        ? <SignIn
                            loadUser={this.loadUser}
                            onRouteChange={this.onRouteChange} />
                        : route === 'register'
                            ? <Register
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange} />
                            :
                            <div>
                                <Logo />
                                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                                <ImageLinkForm
                                    onInputChange={this.onInputChange}
                                    onDetectImage={this.onDetectImage}
                                />
                                <FaceRecognition box={boxes[0]} url={imageUrl} />
                            </div>
                }
            </div>
        )
    }
}
export default App;