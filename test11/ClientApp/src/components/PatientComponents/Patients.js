import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class Patients extends Component {
    constructor(props){
        super(props);
        this.state = {
            patients: [],
            loading: true,
            error_when_fetch: false,
            error_code: 200,
            error_caption: ""
        }
    }
    
    componentDidMount() {
        //fetch patients from database after mounting component
        this.populatePatientsData().then();
    }

    render(){
        if (this.state.loading) {
            return(
                <p>Loading...</p>
            )
        }
        else if (this.state.error_when_fetch){
            return(
                <div>
                    <h1>Error when fetching data from database.</h1>
                    <h2>Try refreshing your page</h2>
                    <p>Error code: <code>{this.state.error_code}</code></p>
                    <p>Error message: <code>{this.state.error_caption}</code></p>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Patients</h1>
                    {this.renderPatientsTable(this.state.patients)}   
                    <Link to='/addnewpatient'>Add new patient to system</Link>
                </div>
            )   
        }
    }
    
    /** handles delete action */
    handleDeletePatient = (id) => {
        //check if user really wants to delete specified patient
        let result = window.confirm(`are you sure you want to delete patient with id ${id} ?`);
        
        if (result === true){
            //do Http DELETE request for specified patient
            fetch(`api/Patients/RemovePatientFromDatabase/${id}`.toLowerCase(), {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    //if patient was successfully deleted, tell user about that fact
                    alert(`Successfully removed ${id}`)
                    //clear patients table
                    this.setState(previousState => ({
                        ...previousState,
                        loading: true,
                        patients: []
                    }))
                    //re-fetch patients from database
                    this.populatePatientsData().then();
                }
                else {
                    //if something went wrong when deleting patient, tell user about that fact
                    alert('Something went wrong');
                }
            })
        }
    }
    
    /** creates patient's table */
    renderPatientsTable = (patients) => {
        return (
            <table className='table table-striped'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Pesel</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Middle Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {patients.map(patient => 
                    <tr key={patient.pesel}>
                        <td>{patient.pesel}</td>
                        <td>{patient.name}</td>
                        <td>{patient.surname}</td>
                        <td>{patient.middleName}</td>
                        <td>{this.renderGender(patient.gender)}</td>
                        <td>{patient.email}</td>
                        <td>
                            <p>
                                <Link to={{pathname: '/patientdetails', search: `id=${patient.pesel}`}}>Details</Link>
                                &nbsp;
                                <a className='link-primary' onClick={() => this.handleDeletePatient(patient.pesel)}>Delete</a>
                                &nbsp;
                                <Link to={{pathname: '/editpatient', search: `id=${patient.pesel}`}}>Edit</Link>
                            </p>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
    
    /** converts index to gender name */
    renderGender = (gender) => {
        switch (gender){
            case 0:
                return 'Male'
            case 1:
                return 'Female'
            case 2:
                return 'Other'
            default:
                return 'Unknown'
        }
    }
    
    /** Fetches data from API server */
    async populatePatientsData(){
        await fetch('/api/Patients/GetAllPatients'.toLowerCase()).then((response) => {
            // checks if response has code 200 (OK)
            if (response.ok){
                //if response was OK, returns response body in JSON format
                return response.json();
            }
            
            // if response was not OK, display response status code and text
            this.setState({
                patients: [],
                loading: false,
                error_when_fetch: true,
                error_code: response.status,
                error_caption: response.statusText
            })
            //throw error to jump to catch promise
            throw new Error('Something went wrong when fetching from database')
        }).then((responseJson) => {
            //if response was ok, set patients
            this.setState({
                patients: responseJson,
                loading: false,
                error_when_fetch: false,
                error_code: 200,
                error_caption: ""
            })
        }).catch((error) => {
            //check if error is string (handled here) or is instance of error class (handled before)
            if (error instanceof String){
                this.setState({
                    patients: [],
                    loading: false,
                    error_when_fetch: true,
                    error_code: 0,
                    error_caption: error
                })
            }
        })
    }
}