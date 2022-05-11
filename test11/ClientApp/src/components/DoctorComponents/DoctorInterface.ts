export interface Specialization {
    specializationId: number;
    name: string;
    doctors: []
}

export enum Gender {
    Male,
    Female,
    Other
}

export type Doctor = {
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

export type NewDoctor = {
    pesel: string;
    name: string;
    surname: string;
    middleName: string;
    email: string;
    gender: number;
    phone: string;
    specializationId: number;
}

export interface NewDoctorWithSpecName {
    pesel: string;
    name: string;
    surname: string;
    middleName: string;
    email: string;
    gender: number;
    phone: string;
    specializationName: string;
}