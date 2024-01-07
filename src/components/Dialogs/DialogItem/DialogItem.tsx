import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

export type DialogItemType = {
  id: number
  name: string
}
export const DialogItem: React.FC<DialogItemType> = ({name, id}) => {
  const path = '/dialogs/' + id
  return (
    <div className={s.dialog + ' ' + s.active}>
      <img
        src='https://www.transparentpng.com/thumb/human/black-human-user-profile-png-icon-free-fsR5FT.png'
        alt=''/>
      <NavLink to={path}>{name}</NavLink>
    </div>
  )
}