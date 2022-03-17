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
        this.populatePatientsData();
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
                    {Patients.renderPatientsTable(this.state.patients)}   
                    <Link to='/addnewpatient'>Add new patient to system</Link>
                </div>
            )   
        }
    }
    
    static handleDeletePatient(id){
        let result = window.confirm(`are you sure you want to delete patient with id ${id} ?`);
        
        if (result === true){
            fetch(`api/Patients/RemovePatientFromDatabase/${id}`.toLowerCase(), {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    alert(`Successfully removed ${id}`)
                    this.forceUpdate();
                }
                else {
                    alert('Something went wrong');
                }
            })
        }
    }
    
    static renderPatientsTable(patients) {
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
                        <td>{patient.middlename}</td>
                        <td>{this.renderGender(patient.gender)}</td>
                        <td>{patient.email}</td>
                        <td>
                            <Link to={{pathname: '/patientdetails', search: `id=${patient.pesel}`}}>See details</Link>
                            &nbsp;
                            &nbsp;
                            <a className='link-primary' onClick={() => this.handleDeletePatient(patient.pesel)}>Delete</a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
    
    static renderGender(gender){
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
    
    async populatePatientsData(){
        await fetch('/api/Patients/GetAllPatients'.toLowerCase()).then((response) => {
            if (response.ok){
                return response.json();
            }
            
            this.setState({
                patients: [],
                loading: false,
                error_when_fetch: true,
                error_code: response.status,
                error_caption: response.statusText
            })
            
            throw new Error('Something went wrong when fetching from database')
        }).then((responseJson) => {
            this.setState({
                patients: responseJson,
                loading: false,
                error_when_fetch: false,
                error_code: 200,
                error_caption: ""
            })
        }).catch((error) => {
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