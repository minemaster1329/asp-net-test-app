import {Component} from "react";
import qs from "qs"
import {Link} from "react-router-dom";

export default class PatientDetails extends Component {
    constructor(props){
        super(props);
        this.state = {patient: undefined, loading: true, error_when_fetching: false, error_code: 0, error_message: ""};
    }
    
    componentDidMount() {
        this.fetchPatient();
    }
    
    static renderPatient(patient){
        return (
            <div>
                <p>PESEL: {patient.pesel}</p>
                <p>Name: {patient.name}</p>
                <p>Surname: {patient.surname}</p>
                <p>Middlename: {patient.middlename}</p>
                <p>Gender: {PatientDetails.renderGender(patient.gender)}</p>
                <p>Email: {patient.email}</p>
            </div>
        )
    }
    
    static renderGender(genderNum){
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
        if (this.state.loading){
            return (
                <p>Loading...</p>
            )
        }
        if (this.state.error_when_fetching){
            return(
                <div>
                    <h1>Error when fetching patient from db</h1>
                    <p>Error code: {this.state.error_code}</p>
                    <p>Error message: {this.state.error_message}</p>
                </div>
            )
        }
        
        else {
            let patient_det = PatientDetails.renderPatient(this.state.patient)
            return(
                <div>
                    <h1>Patient's details:</h1>
                    {patient_det}
                    <Link to='/patients'>Back to patients table</Link>
                </div>
            )    
        }
    }
    
    async fetchPatient(){
        let id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).id;
        await fetch(`api/Patients/GetPatientById/${id}`).then((response) => {
            if (response.ok){
                return response.json();
            }
            
            this.setState({
                patient: undefined,
                loading: false,
                error_when_fetching: true,
                error_code: response.status,
                error_message: response.statusText
            })
            
            throw new Error('something went wrong when fetching patient')
        }).then((responseJson) => {
            this.setState({
                patient: responseJson,
                loading: false,
                error_when_fetching: false,
                error_code: 0,
                error_message: ""
            })
        }).catch((error)=> {
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