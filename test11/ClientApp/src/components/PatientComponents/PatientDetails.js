import {Component} from "react";
import qs from "qs"
import {Link} from "react-router-dom";

export default class PatientDetails extends Component {
    constructor(props){
        super(props);
        this.state = {patient: undefined, loading: true, error_when_fetching: false, error_code: 0, error_message: ""};
    }
    
    componentDidMount() {
        //fetch data for specified patient
        this.fetchPatient().then();
    }
    
    //render all patient data
    renderPatient = (patient) => {
        return (
            <div>
                <p>PESEL: {patient.pesel}</p>
                <p>Name: {patient.name}</p>
                <p>Surname: {patient.surname}</p>
                <p>Middlename: {patient.middlename}</p>
                <p>Gender: {this.renderGender(patient.gender)}</p>
                <p>Email: {patient.email}</p>
            </div>
        )
    }
    
    //convert index number to gender
    renderGender = (genderNum) => {
        switch(genderNum){
            case 0:
                return 'Male';
            case 1:
                return 'Female';
            case 2:
                return 'Other';
            default:
                return 'Unknown';
        }
    }

    render(){
        //check if component is fetching data
        if (this.state.loading){
            return (
                <p>Loading...</p>
            )
        }
        //check if there was an error when fetching
        if (this.state.error_when_fetching){
            return(
                <div>
                    <h1>Error when fetching patient from db</h1>
                    <p>Error code: {this.state.error_code}</p>
                    <p>Error message: {this.state.error_message}</p>
                </div>
            )
        }
        
        //if fetch was successful, render patient's details 
        else {
            let patient_det = this.renderPatient(this.state.patient)
            return(
                <div>
                    <h1>Patient's details:</h1>
                    {patient_det}
                    <Link to='/patients'>Back to patients table</Link>
                </div>
            )    
        }
    }
    
    /** gets patient from server */
    async fetchPatient(){
        //extract patient's pesel number from search string
        let id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).id;
        if (id === undefined){
            this.props.history.push('/notfound')
            return;
        }
        //fetch patient from server
        await fetch(`api/Patients/GetPatientById/${id}`).then((response) => {
            //check if server returned OK
            if (response.ok){
                //if request was successful, return response body
                return response.json();
            }
            
            //if server returned an error, tell user what happened by passing code and text to state
            this.setState({
                patient: undefined,
                loading: false,
                error_when_fetching: true,
                error_code: response.status,
                error_message: response.statusText
            })
            
            throw new Error('something went wrong when fetching patient')
        }).then((responseJson) => {
            //add patient co component's state 
            this.setState({
                patient: responseJson,
                loading: false,
                error_when_fetching: false,
                error_code: 0,
                error_message: ""
            })
        }).catch((error)=> {
            //handle fetch error by passing error message to state
            if (error instanceof String){
                this.setState({
                    patient: undefined,
                    loading: false,
                    error_when_fetching: true,
                    error_code: 0,
                    error_message: error
                })
            }
        })
    }
}