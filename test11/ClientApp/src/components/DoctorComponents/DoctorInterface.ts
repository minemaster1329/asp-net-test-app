export interface Specialization {
    id: number;
    name: string;
    doctors: []
}

export enum Gender {
    Male,
    Female,
    Other
}

export interface Doctor {
    doctorId: number;
    pesel: string;
    name: string;
    surname: string;
    middleName: string;
    email: string;
    gender: Gender;
    phone: string;
    specialization: Specialization;
}

export interface DoctorWithSpecName {
    
}