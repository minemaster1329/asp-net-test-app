import {Component} from "react";

import './patientsStyles.css'
import {Link} from "react-router-dom";
import {Form, FormGroup, Input, Label} from "reactstrap";

export default class AddNewPatient extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPatientPesel: "",
            newPatientName: "",
            newPatientSurname: "",
            newPatientMiddlename: "",
            newPatientGender: 0,
            newPatientEmail: ""
        };
        
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }
    
    handleFormSubmit(event){
        event.preventDefault();
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
            }
            else {
                response.text().then(text=> {
                    console.error(text);
                })
                // response.json().then((json => {
                //    alert(json['title']);
                //    console.error(json);
                // }))   
            }
        }).catch((error) => {
            if (error instanceof String){
                alert(error);
            }
        })
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
        this.setState({
            [name]: value
        });
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
                                <p className='text-invalid-input'>Invalid format</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's name:</td>
                            <td>
                                <input type='text' name='newPatientName' maxLength='35' minLength='2'  value={this.state.newPatientName} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className='text-invalid-input'>Invalid format</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's surname:</td>
                            <td>
                                <input type='text' name='newPatientSurname' maxLength='50' minLength='2'  value={this.state.newPatientSurname} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className='text-invalid-input'>Invalid format</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's middle name:</td>
                            <td>
                                <input type='text' name='newPatientMiddlename' maxLength='50'  value={this.state.newPatientMiddlename} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className='text-invalid-input'>Invalid format</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Patient's email:</td>
                            <td>
                                <input type='text' name='newPatientEmail' maxLength='50'  value={this.state.newPatientEmail} onChange={this.handleChangeEvent}/>
                            </td>
                            <td>
                                <p className='text-invalid-input'>Invalid format</p>
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