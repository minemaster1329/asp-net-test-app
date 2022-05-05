import {validatePatientPesel, patternPhone, patternEmail, patternNames} from '../pubstuff/FieldValidationStuff'

describe("Test validatePesel function", () => {
    it.each([
        ["00000000000", true],
        ["97082148966", true]
    ])('Pesel %p expecting %p', (pesel, expected) => {
        expect(validatePatientPesel(pesel)).toBe(expected);
    });
    
    it('Valid chars and length, invalid cehcksums', () => {
        expect(validatePatientPesel("97082148960")).toBe(false);
        expect(validatePatientPesel("97082148961")).toBe(false);
        expect(validatePatientPesel("97082148962")).toBe(false);
        expect(validatePatientPesel("97082148963")).toBe(false);
        expect(validatePatientPesel("97082148964")).toBe(false);
        expect(validatePatientPesel("97082148965")).toBe(false);
        expect(validatePatientPesel("97082148967")).toBe(false);
        expect(validatePatientPesel("97082148968")).toBe(false);
        expect(validatePatientPesel("97082148969")).toBe(false);

        expect(validatePatientPesel("00000000001")).toBe(false);
        expect(validatePatientPesel("00000000002")).toBe(false);
        expect(validatePatientPesel("00000000003")).toBe(false);
        expect(validatePatientPesel("00000000004")).toBe(false);
        expect(validatePatientPesel("00000000005")).toBe(false);
        expect(validatePatientPesel("00000000006")).toBe(false);
        expect(validatePatientPesel("00000000007")).toBe(false);
        expect(validatePatientPesel("00000000008")).toBe(false);
        expect(validatePatientPesel("00000000009")).toBe(false);
    });
    
    it('Invalid chars, valid length', () => {
        expect(validatePatientPesel("A0000000000")).toBe(false);
    });

    it('Valid chars, invalid length', () => {
        expect(validatePatientPesel("")).toBe(false);
        expect(validatePatientPesel("0000000000")).toBe(false);
        expect(validatePatientPesel("000000000000")).toBe(false);
    });
});