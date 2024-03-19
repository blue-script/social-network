import React, {FC} from 'react'
import {WrappedFieldProps} from "redux-form";
import styles from "./FormsControls.module.css"

type FormControlProps = WrappedFieldProps & {
    type: 'textarea' | 'input'
}

export const FormControl: FC<FormControlProps> = ({ input, meta, type, ...props }) => {
    console.log(input, meta, type)
    console.dir(props)
    const hasError = meta.touched && meta.error;
    const Tag = type;

    return (
            <div className={`${styles.formControl} ${hasError ? styles.error : ''}`}>
                <div>
                    <Tag {...input} {...props} />
                </div>
                {hasError && <span>{meta.error}</span>}
            </div>
    )
}