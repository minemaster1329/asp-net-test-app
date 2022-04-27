export interface FormFieldItem {
    isCorrect: boolean,
    captionCorrect: string,
    captionIncorrect: string,
}

export interface FormFieldProps{
    formFields: FormFieldItem[]
}