import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import PlantsBoard from './containers/plantsBoard';

class App extends Component {
  render() {
    return (
        <Layout>
            <PlantsBoard></PlantsBoard>
        </Layout>
    )
  }
}

export default App;
