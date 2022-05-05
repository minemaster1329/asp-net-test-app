import React from "react";
import qs from "qs";
import {Link} from "react-router-dom";
import './patientsStyles.css'
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {patternNames, patternEmail} from "../../pubstuff/FieldValidationStuff"

export default class EditPatientForm extends React.Component {
    /** function for validating form fields */
    validateField = (fieldname, fieldvalue) => {
        if (fieldname === "gender") return;
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
        document.title = "Editing patient"
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
                [name]: (name === "gender") ? parseInt(value) : value
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
                    PatientId: this.state.patient.patientId,
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
                fetch(`/api/Patients/SavePatientChanges/${this.state.patient_prev.patientId}`, requestOptions).then(response => {
                    //check if server response was OK
                    if (response.ok){
                        //if OK, tell user about that and replace original version of patient with new one
                        alert("Patient saved successfully");
                        this.setState(prevState => ({
                            ...prevState,
                            patient_prev: prevState.patient,
                            patient_changed: false
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
                <Form className="form">
                    <h2>Editing patient {this.state.patient.patientId}</h2>
                    <FormGroup>
                        <Label for="patientName" >Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="patientName"
                            valid={this.state.data_valid.name}
                            invalid={!this.state.data_valid.name}
                            value={this.state.patient.name}
                            onChange={this.handleFormFieldChange}
                        />
                        <FormFeedback>Invalid name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="patientSurname" >Surname</Label>
                        <Input
                            type="text"
                            name="surname"
                            id="patientSurname"
                            valid={this.state.data_valid.surname}
                            invalid={!this.state.data_valid.surname}
                            value={this.state.patient.surname}
                            onChange={this.handleFormFieldChange}
                        />
                        <FormFeedback>Invalid surname</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="patientMiddleName" >Middle Name</Label>
                        <Input
                            type="text"
                            name="middleName"
                            id="patientMiddleName"
                            valid={this.state.data_valid.middleName}
                            invalid={!this.state.data_valid.middleName}
                            value={this.state.patient.middleName}
                            onChange={this.handleFormFieldChange}
                        />
                        <FormFeedback>Invalid middle name</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="patientEmail" >Email</Label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="patientEmail" 
                            placeholder="example@example.com" 
                            valid={this.state.data_valid.email}
                            invalid={!this.state.data_valid.email}
                            value={this.state.patient.email}
                            onChange={this.handleFormFieldChange}
                        />
                        <FormFeedback>Invalid email format</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="patientGender">Gender</Label>
                        <Input 
                            type="select" 
                            name="gender" 
                            id="patientGender" 
                            value={this.state.patient.gender} 
                            onChange={this.handleFormFieldChange}
                        >
                            <option value='0'>Male</option>
                            <option value='1'>Female</option>
                            <option value='2'>Unknown</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.handleSubmitButtonClick}>Submit</Button>
                        <Button onClick={this.handleResetButtonClick}>Reset</Button>
                    </FormGroup>
                </Form>
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