import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PlantsBoard from './containers/PlantsBoard';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Layout>
            <Route path="/plants" component={PlantsBoard}></Route>
        </Layout>
    )
  }
}

export default App;
