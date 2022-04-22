import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import NotFound from './components/NotFound'

import './custom.css'
import Patients from "./components/PatientComponents/Patients";
import PatientDetails from "./components/PatientComponents/PatientDetails";
import AddNewPatient from "./components/PatientComponents/AddNewPatient";
import {Switch} from "react-router-dom";
import EditPatientForm from "./components/PatientComponents/EditPatientForm";
import DoctorsOverview from "./components/DoctorComponents/DoctorsOverview";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/patients' component={Patients} />
              <Route path='/patientdetails'>
                  <Switch>
                      <Route path='/:id' component={PatientDetails}/>
                      <Route component={NotFound}/>
                  </Switch>
              </Route>
              <Route path='/editpatient'>
                  <Switch>
                      <Route path='/:id' component={EditPatientForm}/>
                      <Route component={NotFound}/>
                  </Switch>
              </Route>
              <Route path='/doctors' component={DoctorsOverview}/>
              <Route path='/addnewpatient' component={AddNewPatient}/>
              <Route component={NotFound}/>
          </Switch>
      </Layout>
    );
  }
}
