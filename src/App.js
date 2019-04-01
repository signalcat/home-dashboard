import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PlantsBoard from './containers/PlantsBoard';
import {Route} from 'react-router-dom';
import AquaBoard from './containers/AquaBoard';

class App extends Component {
  render() {
    return (
        <Layout>
            <Route path="/plants" component={PlantsBoard}></Route>
            <Route path="/aqua" component={AquaBoard}></Route>
        </Layout>
    )
  }
}

export default App;
