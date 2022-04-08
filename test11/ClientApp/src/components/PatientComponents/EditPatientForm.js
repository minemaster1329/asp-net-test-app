import React from "react";
import qs from "qs";
import {Link} from "react-router-dom";
import './patientsStyles.css'
const patternNames = /^[A-z][a-z]+$/
const patternEmail = /(^$)|(^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$)/;

export default class EditPatientForm extends React.Component {
    /** function for validating form fields */
    validateField = (fieldname, fieldvalue) => {
        let field_valid = false;
        //select regex for specified field and check if value matches it
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
        //change validity state of specified field
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
    }
    
    componentDidMount() {
        //fetch patient data if component mount
        this.fetchPatientData().then();
    }

    /** handle field value changed */
    handleFormFieldChange = (event) => {
        //get field name and value
        let {name, value} = event.target;
        
        //validate field value
        this.validateField(name, value);
        
        //update specified patient field
        this.setState((prevState) => ({
            ...prevState,
            patient: {
                ...prevState.patient,
                [name]: value
            }
        }));
        
        //check if patient was edited or not
        this.setState(prevState => ({
            ...prevState,
            patient_changed: JSON.stringify(prevState.patient) !== JSON.stringify(prevState.patient_prev)
        }))
    }
    
    /** handle reset button action */
    handleResetButtonClick = () => {
        //replace current patient object values with copy
        this.setState((prevState) => ({
            ...prevState,
            patient: prevState.patient_prev,
            patient_changed: false
        }))
    }
    
    /** handle submit button action */
    handleSubmitButtonClick = () => {
        //check if all fields are correct
        if (this.state.data_valid.email && this.state.data_valid.surname && this.state.data_valid.middleName && this.state.data_valid.email){
            //return from function if patient not changed
            if (!this.state.patient_changed) return;
            //check if user is sure it wants to edit patient
            if (window.confirm("Save changes to patient?")){
                //create new patient object
                const patient = {
                    Pesel: this.state.patient.pesel,
                    Name: this.state.patient.name,
                    Surname: this.state.patient.surname,
                    MiddleName: this.state.patient.middleName,
                    Email: this.state.patient.email,
                    Gender: parseInt(this.state.patient.gender),
                    Visits: []
                }
                
                //create request options
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type' :  'application/json'},
                    body: JSON.stringify(patient)
                };

                //send edited patient object to database
                fetch(`/api/Patients/SavePatientChanges/${patient.Pesel}`, requestOptions).then(response => {
                    //check if server response was OK
                    if (response.ok){
                        //if OK, tell user about that and replace original version of patient with new one
                        alert("Patient saved successfully");
                        this.setState(prevState => ({
                            ...prevState,
                            patient_prev: prevState.patient
                        }))
                    }

                    else {
                        //if something went wrong, tell user about that fact via console
                        response.text().then(text => {
                            console.error(text);
                        })
                    }
                })
            }
        }
        else {
            //tell user, that some fields are filled with incorrect data
            alert("Some fields filled with incorrect data!")
        }
    }

    /** generates form object */
    renderForm = () => {
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
    
    /** fetches patient specified by id */
    async fetchPatientData(){
        //get patient id from query string
        let patient_id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).id;
        
        //fetch patient
        await fetch(`/api/Patients/GetPatientById/${patient_id}`).then((response) => {
            if (response.ok){
                //if response was OK, return JSON for further processing
                return response.json();
            }
            
            //tell user that something went wrong (information displayed instead of form)
            this.setState((prevState) => ({
                ...prevState,
                loading: false,
                error_when_fetching: true,
                error_message: response.statusText
            }))
            
            //throw new Error('something went wrong when fetching patient')
        }).then((responseJson) => {
            //assign patient to state and create copy
            this.setState((prevState) => ({
                ...prevState,
                patient_prev: responseJson,
                patient: responseJson,
                loading: false
            }))
        })
    }
}