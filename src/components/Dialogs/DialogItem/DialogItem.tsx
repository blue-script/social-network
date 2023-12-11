import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink, Router} from 'react-router-dom';

export type DialogItemPropsType = {
  name: string
  id: string
}
export const DialogItem: React.FC<DialogItemPropsType> = ({name, id}) => {
  const path = '/dialogs/' + id
  return (
    <div className={s.dialog + ' ' + s.active}>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8ZaLUTA2vEGXFAah4FD0Xvpt7kK3l5gmhMDvPcQG6qu65IuvVJxi3_OofRKdB0AvP4Y&usqp=CAU'
        alt=''/>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}