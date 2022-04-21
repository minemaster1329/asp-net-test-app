import * as React from "react";

enum Gender {
    Male,
    Female,
    Unknown
}

interface prop {
    message: string;
} 

interface Specialization {
    id: number;
    name: string;
}

interface Doctor {
    doctorId: number;
    pesel: string;
    name: string;
    surname: string;
    middleName: string;
    email: string;
    gender: Gender;
    specialization: Specialization;
}

interface stat {
    changed: boolean;
    doctor: Doctor;
}
export default class DoctorsOverview extends React.Component<prop, stat>{
    render(){
        return(
            <p>Doctors page</p>
        )
    }
}