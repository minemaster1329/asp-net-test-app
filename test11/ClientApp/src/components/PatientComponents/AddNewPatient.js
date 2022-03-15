import {Component} from "react";

import './patientsStyles.css'

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
    }
    
    handleFormSubmit(event){
        event.preventDefault();
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
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p><input type='submit' value='Submit'/><input type='reset' value='Clear'/></p>
                </form>
            </div>
        )
    }
} 