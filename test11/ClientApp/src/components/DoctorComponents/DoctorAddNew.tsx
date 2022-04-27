import React, {FormEvent, MouseEvent as ReactMouseEvent, MouseEventHandler, useEffect, useState} from "react";
import {Gender} from "./DoctorInterface";
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {patternNames} from "../FieldValidationStuff"
import {Link} from "react-router-dom";

export default function DoctorAddNew() {
    
    const [nameValid, setNameValid] = useState<boolean>(false);
    const [surnameValid, setSurnameValid] = useState<boolean>(false);
    const [middleNameValid, setMiddleNameValid] = useState<boolean>(true);
    const [emailValid, setEmailValid] = useState<boolean>(true);
    const [phoneValid, setPhoneValid] = useState<boolean>(true);
    
    const [pesel, setPesel] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        setNameValid(patternNames.test(name));
    });
    const [surname, setSurname] = useState("");
    useEffect(()=> {
       setSurnameValid(patternNames.test(surname)) 
    });
    const [middleName, setMiddleName] = useState("");
    useEffect(()=> {
        setMiddleNameValid(/^$/.test(middleName) || patternNames.test(middleName));
    });
    const [email, setEmail] = useState("")
    useEffect(()=> {
        setEmailValid(/^$/.test(email) || patternNames.test(email))
    });
    const [gender, setGender] = useState<Gender>(Gender.Male);
    const [phone, setPhone] = useState("");
    useEffect(()=> {
        
    });
    
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
                <FormGroup>
                    <Label for='doctorName'>Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="doctorName"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        valid={nameValid}
                        invalid={!nameValid}
                    />
                    <FormFeedback>Invalid name format</FormFeedback>
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