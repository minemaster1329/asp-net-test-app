import React, {FormEvent, MouseEvent as ReactMouseEvent, MouseEventHandler, useEffect, useState} from "react";
import {Gender} from "./DoctorInterface";
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {patternEmail, patternNames, patternPhone, validatePatientPesel} from "../FieldValidationStuff"
import {Link} from "react-router-dom";

export default function DoctorAddNew() {
    
    const [peselValid, setPeselValid] = useState<boolean>(false);
    const [nameValid, setNameValid] = useState<boolean>(false);
    const [surnameValid, setSurnameValid] = useState<boolean>(false);
    const [middleNameValid, setMiddleNameValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phoneValid, setPhoneValid] = useState<boolean>(true);
    
    const [pesel, setPesel] = useState("");
    useEffect(() => {
        setPeselValid(validatePatientPesel(pesel))
    }, [pesel])
    const [name, setName] = useState("");
    useEffect(() => {
        setNameValid(patternNames.test(name));
    }, [name]);
    const [surname, setSurname] = useState("");
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
    
    const handleSubmit = (evt : ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        alert(`Submitting Name ${name}`)
    }
    
    const handleReset = (evt : ReactMouseEvent<HTMLButtonElement, MouseEvent>) => {
        evt.preventDefault();
        setName("");
        setSurname("");
        setMiddleName("");
        setEmail("");
        setGender(Gender.Male);
        setPhone("");
    }
    
    return (
        <div>
            <h1>Add new doctor:</h1>
            <Form className="form">
                <FormGroup className="m-1">
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
                <FormGroup className="m-1">
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
                <FormGroup className="m-1">
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
                <FormGroup className="m-1">
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
                <FormGroup className="m-1">
                    <Label for='doctorEmail'>Email</Label>
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
                <FormGroup className="m-1">
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