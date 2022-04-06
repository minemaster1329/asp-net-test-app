import React from "react";
import qs from "qs";
import {Link} from "react-router-dom";
import './patientsStyles.css'
const patternNames = /^[A-z][a-z]+$/
const patternEmail = /(^$)|(^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$)/;

export default class EditPatientForm extends React.Component {
    validateField = (fieldname, fieldvalue) => {
        let field_valid = false;
        switch (fieldname) {
            case 'name':
            case 'surname':
                field_valid = patternNames.test(fieldvalue)
            break;
            case 'middleName':
                field_valid = /^$/.test(fieldvalue) || patternNames.test(fieldvalue)
            break;
            case 'email':
                field_valid = patternEmail.test(fieldvalue);
            break;
        }

        this.setState(prevState => ({
            ...prevState,
            data_valid: {
                ...prevState.data_valid,
                [fieldname]: field_valid
            }
        }))
    }
    
    constructor(props){
        super(props);
        
        this.state = {
            patient_prev: undefined,
            patient: undefined,
            patient_changed: false,
            data_valid: {
                name: true,
                surname: true,
                middleName: true,
                email: true,
            },
            loading: true,
            error_when_fetching: false,
            error_message: ""
        };
        
        this.handleFormFieldChange = this.handleFormFieldChange.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }
    
    componentDidMount() {
        this.fetchPatientData();
    }
    
    handleFormFieldChange(event) {
        let {name, value} = event.target;
        
        this.validateField(name, value);
        
        this.setState((prevState) => ({
            ...prevState,
            patient: {
                ...prevState.patient,
                [name]: value
            }
        }));
        
        this.setState(prevState => ({
            ...prevState,
            patient_changed: JSON.stringify(prevState.patient) !== JSON.stringify(prevState.patient_prev)
        }))
    }
    
    handleResetButtonClick = () => {
        this.setState((prevState) => ({
            ...prevState,
            patient: prevState.patient_prev,
            patient_changed: false
        }))
    }
    
    handleSubmitButtonClick = () => {
        if (this.state.data_valid.email && this.state.data_valid.surname && this.state.data_valid.middleName && this.state.data_valid.email){
            if (!this.state.patient_changed) return;
            if (window.confirm("Save changes to patient?")){
                const patient = {
                    Pesel: this.state.patient.pesel,
                    Name: this.state.patient.name,
                    Surname: this.state.patient.surname,
                    MiddleName: this.state.patient.middleName,
                    Email: this.state.patient.email,
                    Gender: parseInt(this.state.patient.gender)
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type' :  'application/json'},
                    body: JSON.stringify(patient)
                };

                fetch(`/api/Patients/SavePatientChanges/${patient.Pesel}`, requestOptions).then(response => {
                    if (response.ok){
                        alert("Patient saved successfully");
                        this.setState(prevState => ({
                            ...prevState,
                            patient_prev: prevState.patient
                        }))
                    }

                    else {
                        response.text().then(text => {
                            console.error(text);
                        })
                    }
                })
            }
        }
        else {
            alert("Some fields filled with incorrect data!")
        }
    }

    renderForm(){
        return(
            <div>
                <h2>Editing patient {this.state.patient.pesel}</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Name: </td>
                            <td><input type='text' name='name' value={this.state.patient.name} onChange={this.handleFormFieldChange}/></td>
                            <td>
                                <p className={this.state.data_valid.name ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.data_valid.name ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Surname: </td>
                            <td><input type='text' name='surname' value={this.state.patient.surname} onChange={this.handleFormFieldChange}/></td>
                            <td>
                                <p className={this.state.data_valid.surname ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.data_valid.surname ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Middlename: </td>
                            <td><input type='text' name='middleName' value={this.state.patient.middleName} onChange={this.handleFormFieldChange}/></td>
                            <td>
                                <p className={this.state.data_valid.middleName ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.data_valid.middleName ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Email: </td>
                            <td><input type='text' name='email' value={this.state.patient.email} onChange={this.handleFormFieldChange}/></td>
                            <td>
                                <p className={this.state.data_valid.email ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.data_valid.email ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Gender: </td>
                            <td>
                                <select name='gender' value={this.state.patient.gender} onChange={this.handleFormFieldChange}>
                                    <option value='0'>Male</option>
                                    <option value='1'>Female</option>
                                    <option value='2'>Unknown</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button onClick={this.handleSubmitButtonClick}>Submit</button>
                                &nbsp;
                                <button onClick={this.handleResetButtonClick}>Reset</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Link to='/patients'>Back to patients table</Link>
                {this.state.patient_changed ? <p>Values Changed, please save changes!</p> : null}
            </div>
        )
    }
    
    render(){
        let content = (this.state.loading) ? (<p>loading</p>) : (this.state.error_when_fetching) ? <p>Error when fetching</p> : this.renderForm();
        return(
            <div>
                <h1>Patient edit form</h1>
                {content}
            </div>
        )
    }
    
    async fetchPatientData(){
        let patient_id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).id;
        
        await fetch(`/api/Patients/GetPatientById/${patient_id}`).then((response) => {
            if (response.ok){
                return response.json();
            }
            
            this.setState((prevState) => ({
                ...prevState,
                loading: false,
                error_when_fetching: true,
                error_message: response.statusText
            }))
            
            throw new Error('something went wrong when fetching patient')
        }).then((responseJson) => {
            this.setState((prevState) => ({
                ...prevState,
                patient_prev: responseJson,
                patient: responseJson,
                loading: false
            }))
        })
    }
}