import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import NotFound from './components/NotFound'

import './custom.css'
import Patients from "./components/PatientComponents/Patients";
import PatientDetails from "./components/PatientComponents/PatientDetails";
import AddNewPatient from "./components/PatientComponents/AddNewPatient";
import {Switch} from "react-router-dom";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/counter' component={Counter} />
              <Route path='/patients' component={Patients} />
              <Route path='/patientdetails'>
                  <Route path='/:id' component={PatientDetails}/>
              </Route>
              <Route path='/addnewpatient' component={AddNewPatient}/>
              <Route component={NotFound}/>
          </Switch>
      </Layout>
    );
  }
}
