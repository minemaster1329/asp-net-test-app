import {
    validatePatientPesel,
    patternPhone,
    patternEmail,
    patternNames,
    validateName
} from '../pubstuff/FieldValidationStuff'

describe("Test validatePesel function", () => {
    
    //valid PESEL number
    it.each([
        ["00000000000", true],
        ["97082148966", true]
    ])('Pesel %p expecting %p', (pesel, expected) => {
        expect(validatePatientPesel(pesel)).toBe(expected);
    });
    
    //invalid checksums
    it.each([
        ["97082148960", false],
        ["97082148961", false],
        ["97082148962", false],
        ["97082148963", false],
        ["97082148964", false],
        ["97082148965", false],
        ["97082148967", false],
        ["97082148968", false],
        ["97082148969", false],
        ["00000000001", false],
        ["00000000002", false],
        ["00000000003", false],
        ["00000000004", false],
        ["00000000005", false],
        ["00000000006", false],
        ["00000000007", false],
        ["00000000008", false],
        ["00000000009", false],
    ])('Pesel %p expecting %p', (pesel, expected) => {
        expect(validatePatientPesel(pesel)).toBe(expected);
    });
    
    //valid length ,invalid chars
    it.each([
        ["A0000000000", false]
    ])('Pesel %p expecting %p', (pesel, expected) => {
        expect(validatePatientPesel(pesel)).toBe(expected);
    });
    
    //invalid length and chars
    it.each([
        ["", false],
        ["0000000000", false],
        ["000000000000", false]
    ])('Pesel %p expecting %p', (pesel, expected) => {
        expect(validatePatientPesel(pesel)).toBe(expected);
    });
});

describe("Test validateName function", () => {
    it.each([
        ["", false, false],
        ["", true, true]
    ])('Name validation %p expecting %p', (name, canBeEmpty, expected) => {
       expect(validateName(name, canBeEmpty, expected)); 
    });
})