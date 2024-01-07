import React from 'react';
import s from '../Dialogs.module.css';
import {MessageType} from '../../../redux/dialogs-reducer';

export const Message: React.FC<MessageType> = ({message}) => {
  return <div className={s.message}>{message}</div>
}