import React from "react";
import {Doctor, Gender, Specialization} from "./DoctorInterface";

interface State {
    doctors: Doctor[];
    loading: boolean;
    error_when_fetching: boolean;
    error_code: number;
    error_message: string;
}

export default class DoctorsOverview extends React.Component<{}, State> {
    constructor(props: {}){
        super(props);
        
        this.state = {
            doctors: [],
            loading: true,
            error_when_fetching: false,
            error_code: 0,
            error_message: ""
        }
    }
    
    async componentDidMount() {
        await this.populateDoctorsData()
    }

    render(){
        let content = this.state.loading ? <p>Loading</p> : this.renderDoctorsTable(this.state.doctors);
        return (
            <div>
                <h1>Doctors:</h1>
                {content}
            </div>
        )
    }
    
    renderDoctorsTable = (doctors : Doctor[]) => {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Pesel</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Middle Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                </tr>
                </thead>
                <tbody>
                {doctors.map(doctor => {
                        console.log(doctor);
                        return (<tr key={doctor.doctorId}>
                            <td>{doctor.pesel}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.surname}</td>
                            <td>{doctor.middleName}</td>
                            <td>{doctor.email}</td>
                            <td>{this.renderGender(doctor.gender)}</td>
                            <td>{doctor.phone}</td>
                            <td>{doctor.specialization.name}</td>
                        </tr>)
                    }
                )}
                </tbody>
            </table>
        )
    }
    
    renderGender = (gender: Gender) => {
        switch (gender){
            case Gender.Female: return "Female";
            case Gender.Male: return "Male";
            case Gender.Other: return "Other";
        }
    }
    
    async populateDoctorsData(){
        await fetch('api/Doctors/GetAllDoctorsWithSpecialization'.toLowerCase()).then((response) => {
            if (response.ok){
                return response.json();
            }
            this.setState({
                doctors: [],
                loading: false,
                error_when_fetching: true,
                error_code: response.status,
                error_message: response.statusText
            })
            
            throw new Error('Something went wrong when fetching from database')
        })
            .then(responseJson => {
                this.setState({
                    doctors: responseJson,
                    loading: false,
                    error_when_fetching: false,
                    error_code: 0,
                    error_message: ""
                })
            })
    }
}