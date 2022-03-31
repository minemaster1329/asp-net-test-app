﻿import {Component} from "react";

import './patientsStyles.css'
import {Link} from "react-router-dom";

const peselWeights = [1,3,7,9];
const patternPesel = /^\d{11}$/;
const patternNames = /^[A-Z][a-z]+$/;
const patternEmail = /(^$)|(^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$)/; 

function validatePatientPesel(pesel){
    if (patternPesel.test(pesel)){
        let checksum = parseInt(pesel.charAt(10));
        let calcChecksum = 0;
        
        for (let i = 0; i < 10; i++){
            calcChecksum += parseInt(pesel.charAt(i)) * peselWeights[i%4];
        }
        
        calcChecksum %= 10;
        
        if (calcChecksum !== 0) calcChecksum = 10 - calcChecksum;
        
        return checksum === calcChecksum;
    }
    else return false;
}

export default class AddNewPatient extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPatientPesel: "",
            newPatientName: "",
            newPatientSurname: "",
            newPatientMiddlename: "",
            newPatientGender: 0,
            newPatientEmail: "",
            newPatientPeselValid: false,
            newPatientNameValid: false,
            newPatientSurnameValid: false,
            newPatientMiddlenameValid: true,
            newPatientEmailValid: true,
        };
        
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.validateField = this.validateField.bind(this);
    }
    
    handleFormSubmit(event){
        event.preventDefault();
        
        if (this.state.newPatientNameValid &&
            this.state.newPatientSurnameValid &&
            this.state.newPatientMiddlenameValid &&
            this.state.newPatientPeselValid &&
            this.state.newPatientEmailValid
        ) {
            let newPatient = {
                Pesel: this.state.newPatientPesel,
                Name: this.state.newPatientName,
                Surname: this.state.newPatientSurname,
                MiddleName: this.state.newPatientMiddlename,
                Email: this.state.newPatientEmail,
                Gender: parseInt(this.state.newPatientGender)
            }

            fetch('api/patients/addnewpatient', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPatient)
            }).then(response => {
                if (response.ok){
                    alert("Patient added successfully.")
                    
                    this.setState({
                        newPatientPesel: "",
                        newPatientName: "",
                        newPatientSurname: "",
                        newPatientMiddlename: "",
                        newPatientGender: 0,
                        newPatientEmail: "",
                        newPatientPeselValid: false,
                        newPatientNameValid: false,
                        newPatientSurnameValid: false,
                        newPatientMiddlenameValid: true,
                        newPatientEmailValid: true,
                    })
                }
                else {
                    response.text().then(text=> {
                        console.error(text);
                    })  
                }
            }).catch((error) => {
                if (error instanceof String){
                    alert(error);
                }
            })
        }
        
        else alert("Some fields filled wrong!");
    }
    
    handleClearForm(event){
        event.preventDefault();
        this.setState({
            newPatientPesel: "",
            newPatientName: "",
            newPatientSurname: "",
            newPatientMiddlename: "",
            newPatientGender: 0,
            newPatientEmail: ""
        });
    }
    
    handleChangeEvent(event){
        let target = event.target;
        const value = target.value;
        const name = target.name;
        this.validateField(name, value);
        this.setState({
            [name]: value
        });
    }
    
    validateField(fieldName, fieldValue){
        switch(fieldName){
            case 'newPatientPesel':
                this.setState({
                    [fieldName+'Valid']: validatePatientPesel(fieldValue)
                });
                break;
            case 'newPatientName':
            case 'newPatientSurname':
                this.setState({
                    [fieldName+'Valid']: patternNames.test(fieldValue)
                });
                break;
            case 'newPatientMiddlename':
                this.setState({
                    [fieldName+'Valid']: /^$/.test(fieldValue) || patternNames.test(fieldValue)
                });
                break;
            case 'newPatientEmail':
                this.setState({
                    [fieldName+'Valid']: patternEmail.test(fieldValue)
                });
                break;
        }
    }
    
    render(){
        return(
            <div>
                <h1>Add new patient to system</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>Patient's pesel:</td>
                            <td>
                                <input type='text' name='newPatientPesel' maxLength='11' minLength='11' value={this.state.newPatientPesel} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className={this.state.newPatientPeselValid ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.newPatientPeselValid ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's name:</td>
                            <td>
                                <input type='text' name='newPatientName' maxLength='35' minLength='2'  value={this.state.newPatientName} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className={this.state.newPatientNameValid ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.newPatientNameValid ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's surname:</td>
                            <td>
                                <input type='text' name='newPatientSurname' maxLength='50' minLength='2'  value={this.state.newPatientSurname} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className={this.state.newPatientSurnameValid ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.newPatientSurnameValid ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's middle name:</td>
                            <td>
                                <input type='text' name='newPatientMiddlename' maxLength='50'  value={this.state.newPatientMiddlename} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className={this.state.newPatientMiddlenameValid ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.newPatientMiddlenameValid ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's email:</td>
                            <td>
                                <input type='text' name='newPatientEmail' maxLength='50'  value={this.state.newPatientEmail} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className={this.state.newPatientEmailValid ? 'text-valid-input' : 'text-invalid-input'}>
                                    {this.state.newPatientEmailValid ? 'Valid' : 'Invalid'}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's gender:</td>
                            <td>
                                <select name='newPatientGender' value={this.state.newPatientGender} onChange={this.handleChangeEvent}>
                                    <option value='0'>Male</option>
                                    <option value='1'>Female</option>
                                    <option value='2'>Unknown</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p><input type='submit' value='Submit'/><input type='reset' value='Clear' onClick={this.handleClearForm}/></p>
                </form>
                <Link to='/patients'>Back to patients table</Link>
            </div>
        )
    }
} 