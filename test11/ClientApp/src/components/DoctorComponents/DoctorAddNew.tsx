import React, {MouseEvent as ReactMouseEvent, useEffect, useState} from "react";
import {Gender, NewDoctor, NewDoctorWithSpecName, Specialization} from "./DoctorInterface";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {patternEmail, patternNames, patternPhone, validatePatientPesel} from "../../pubstuff/FieldValidationStuff"
import {Link} from "react-router-dom";

export default function DoctorAddNew() {
    const [peselValid, setPeselValid] = useState<boolean>(false);
    const [nameValid, setNameValid] = useState<boolean>(false);
    const [surnameValid, setSurnameValid] = useState<boolean>(false);
    const [middleNameValid, setMiddleNameValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phoneValid, setPhoneValid] = useState<boolean>(true);
    
    const [avaibleSpecializations, setAvailableSpecializations] = useState<Specialization[]>([])
    useEffect(() => {
        const fetchData = async () => {
            await fetch('api/Specialization/GetAllSpecializations'.toLowerCase()).then(response => {
                if (response.ok){
                    return response.json();
                }
                
                alert(`Code: ${response.status}; Cause: ${response.statusText}`);
                throw new Error("Error when fetching data");
            }).then(responseJson => {
                setAvailableSpecializations(responseJson);
            }).catch(reason => {
                if (reason instanceof String){
                    alert(`Something went wrong when fetching data ${reason}`);
                }
            })
        }
        
        fetchData();
    }, [])
    
    //NEW DOCTOR DATA
    const [specializationId, setSpecializationId] = useState<number>(-2);
    const [pesel, setPesel] = useState("");
    useEffect(() => {
        setPeselValid(validatePatientPesel(pesel))
    }, [pesel])
    const [name, setName] = useState("");
    useEffect(() => {
        setNameValid(patternNames.test(name));
    }, [name]);
    const [surname, setSurname] = useState( "");
    useEffect(()=> {
       setSurnameValid(patternNames.test(surname)) 
    }, [surname]);
    const [middleName, setMiddleName] = useState("");
    useEffect(()=> {
        setMiddleNameValid(/^$/.test(middleName) || patternNames.test(middleName));
    }, [middleName]);
    const [email, setEmail] = useState("")
    useEffect(()=> {
        setEmailValid(/^$/.test(email) || patternEmail.test(email))
    }, [email]);
    const [gender, setGender] = useState<number>(Gender.Male);
    const [phone, setPhone] = useState("");
    useEffect(()=> {
        setPhoneValid(/^$/.test(phone) || patternPhone.test(phone))
    }, [phone]);
    
    const [newSpecializationName, setNewSpecializationName] = useState<string>("");
    
    const handleSubmit = async (evt : ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        if (peselValid && nameValid && surnameValid && middleNameValid && emailValid && phoneValid && (specializationId !== -2) && (((specializationId === -1) && newSpecializationName !== "") || specializationId > 0)) {
            alert(`Submitting doctor with Pesel: ${pesel}`);
            if (specializationId === -1){
                let newDoctor: NewDoctorWithSpecName = {
                    pesel: pesel,
                    name: name,
                    surname: surname,
                    middleName: middleName,
                    email: email,
                    gender: gender,
                    phone: phone,
                    specializationName: newSpecializationName
                }
                await fetch('/api/Doctors/AddNewDoctorWithSpecializationName', {
                  method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newDoctor)
                }).then(response => {
                    if (response.ok){
                        alert("Doctor and specialization added successfully.");
                    }
                    else {
                        response.text().then(text => {
                            console.log(text);
                        });
                    }
                })
            }
            else {
                let newDoctor: NewDoctor = {
                    pesel: pesel,
                    name: name,
                    surname: surname,
                    middleName: middleName,
                    email: email,
                    gender: gender,
                    phone: phone,
                    specializationId: specializationId
                }
                
                await fetch('/api/Doctors/AddNewDoctor'.toLowerCase(), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newDoctor)
                }).then(response => {
                    if (response.ok){
                        alert("Doctor added successfully.");
                    }
                    else {
                        response.text().then(text => {
                            console.log(text);
                        });
                    }
                })
            }
        }
        else {
            alert("Some fields have invalid values.");
        }
    }
    
    const handleReset = (evt : ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setPesel("");
        setName("");
        setSurname("");
        setMiddleName("");
        setEmail("");
        setGender(Gender.Male);
        setPhone("");
        setNewSpecializationName("");
        setSpecializationId(-2);
    }
    
    return (
        <div>
            <h1>Add new doctor:</h1>
            <Form className="form">
                <FormGroup className="m-2">
                    <Label for={"doctorPesel"}>Pesel</Label>
                    <Input
                        type={"text"}
                        name={"pesel"}
                        id={"doctorPesel"}
                        value={pesel}
                        placeholder={"ex. 00000000000"}
                        onChange={e => setPesel(e.target.value)}
                        invalid={!peselValid}
                        valid={peselValid}
                        />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for='doctorName'>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="doctorName"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        invalid={!nameValid}
                        valid={nameValid}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for='doctorSurname'>Surname</Label>
                    <Input
                        type="text"
                        name="surname"
                        id="doctorSurname"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                        invalid={!surnameValid}
                        valid={surnameValid}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for='doctorMiddleName'>Middle name</Label>
                    <Input
                        type="text"
                        name="middleName"
                        id="doctorMiddleName"
                        value={middleName}
                        onChange={e => setMiddleName(e.target.value)}
                        invalid={!middleNameValid}
                        valid={middleNameValid}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for='doctorPhone'>Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="doctorEmail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        invalid={!emailValid}
                        valid={emailValid}
                    />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for='doctorGender'>Gender</Label>
                    <Input
                        type="select"
                        name="gender"
                        id="doctorGender"
                        value={gender}
                        onChange={e => setGender(parseInt(e.target.value))}>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                        <option value={2}>Other</option>
                    </Input>
                </FormGroup>
                <FormGroup className='m-2'>
                    <Label for='doctorSpecialization'>Select specialization</Label>
                    <Input
                        type="select"
                        name="specialization"
                        id="doctorSpecialization"
                        value={specializationId}
                        onChange={e => setSpecializationId(Number(e.target.value))}>
                        <option value={-2}>Choose specialization</option>
                        <option value={-1}>Add new specialization</option>
                        {avaibleSpecializations.map(item => (
                            <option key={item.specializationId} value={item.specializationId}>{item.name}</option>
                        ))}
                    </Input>
                </FormGroup>
                {specializationId === -1 ?
                    <FormGroup className='m-2'>
                        <Label for="newSpecializationName">Enter new specialization name:</Label>
                        <Input
                            type='text'
                            name='specialziationName'
                            id='newSpecialziationName'
                            value={newSpecializationName}
                            onChange={e => setNewSpecializationName(e.target.value)}
                        />
                    </FormGroup>
                    : null
                }
                <FormGroup>
                    <Button onClick={handleSubmit}>Submit</Button>
                    &nbsp;
                    <Button onClick={handleReset}>Reset</Button>
                </FormGroup>
            </Form>
            <Link to='/doctors/overview'>Back to doctors table</Link>
        </div>
    )
}