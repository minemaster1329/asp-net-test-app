import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import NotFound from './components/NotFound'

import './custom.css'
import Patients from "./components/PatientComponents/Patients";
import PatientDetails from "./components/PatientComponents/PatientDetails";
import AddNewPatient from "./components/PatientComponents/AddNewPatient";
import EditPatientForm from "./components/PatientComponents/EditPatientForm";
import DoctorsOverview from "./components/DoctorComponents/DoctorsOverview";
import DoctorAddNew from "./components/DoctorComponents/DoctorAddNew";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            
            <Route path='/patients' component={Patients} />
            <Route exact path='/patientdetails' component={NotFound}>
              <Route path='/:id' component={PatientDetails}/>
            </Route>
            <Route path='/editpatient'>
              <Route path='/:id' component={EditPatientForm}/>
            </Route>
            <Route path='/addnewpatient' component={AddNewPatient}/>
            
            <Route path='/doctor/addnew' component={DoctorAddNew}/>
            <Route path='/doctor/overview' component={DoctorsOverview}/>
            
            <Route path="*" component={NotFound}/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
