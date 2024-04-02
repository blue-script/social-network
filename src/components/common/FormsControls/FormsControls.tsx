import React, {FunctionComponent} from 'react'
import s from "./FormsControls.module.css"
import {WrappedFieldProps} from "redux-form/lib/Field";
import {ValidatorsType} from "../../../utils/validators/validators";
import {Field} from "redux-form";


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl {...props}><textarea {...input} {...props}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input} = props
    return <FormControl  {...props}><input {...input} {...props}/></FormControl>
}

const FormControl: React.FC<WrappedFieldProps> = (
    {
        children,
        meta: {touched, error},
    }) => {
    const hasError = touched && error
    return <div className={s.formControl + ' ' + (hasError ? s.error : "")}>
        <div>{children}</div>
        {hasError && <span>{error}</span>}
    </div>
}

export const createField = (placeholder: string, name: string, validate: Partial<ValidatorsType>[], component: FunctionComponent<WrappedFieldProps>, props: object = {}, text: string = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}

        /> {text}
    </div>
)