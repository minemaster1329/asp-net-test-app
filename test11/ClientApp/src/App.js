import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';

import './custom.css'
import Patients from "./components/PatientComponents/Patients";
import PatientDetails from "./components/PatientComponents/PatientDetails";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/patients' component={Patients} />
        <Route path='/patientdetails' component={Patients}>
            <Route path='/:id' component={PatientDetails}/>
        </Route>
      </Layout>
    );
  }
}
