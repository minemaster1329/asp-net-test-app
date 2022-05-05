export const patternNames = /^[A-z][a-z]+$/
export const patternEmail = /(^$)|(^[A-Z0-9a-z]+@[A-Za-z0-9]+\.[A-Za-z]{2,64}$)/;
export const peselWeights = [1,3,7,9];
export const patternPesel = /^\d{11}$/;
export const patternPhone = /^\d{9}$/

export function validatePatientPesel(pesel){
    if (patternPesel.test(pesel)){
        let checksum = parseInt(pesel.charAt(10));
        let calcChecksum = 0;

        for (let i = 0; i < 10; i++){
            calcChecksum += parseInt(pesel.charAt(i)) * peselWeights[i%4];
        }

        calcChecksum %= 10;

        if (calcChecksum !== 0) calcChecksum = 10 - calcChecksum;

        return checksum === calcChecksum;
    }
    else return false;
}

export function validateName(input, canBeEmpty = false){
    return (canBeEmpty || /^$/.test(input)) || patternNames.test(input);
}