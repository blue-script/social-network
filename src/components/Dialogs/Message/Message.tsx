import React from 'react';
import s from '../Dialogs.module.css';

type Props = {
    id?: number
    message: string
}

export const Message: React.FC<Props> = ({message}) => {
    return <div className={s.message}>{message}</div>
}