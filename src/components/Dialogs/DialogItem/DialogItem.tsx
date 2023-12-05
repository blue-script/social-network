import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

type DialogItemPropsType = {
  name: string
  id: string
}
export const DialogItem: React.FC<DialogItemPropsType> = ({name, id}) => {
  const path = '/dialogs/' + id
  return (
    <div className={s.dialog + ' ' + s.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}