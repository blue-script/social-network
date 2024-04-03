import React from 'react';
import s from '../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import defaultIcon from "../../../assets/images/defaultUserPhoto.png"

export type DialogItemType = {
    id: number
    name: string
}
export const DialogItem: React.FC<DialogItemType> = ({name, id}) => {
    const path = '/dialogs/' + id
    return (
        <div className={s.dialog + ' ' + s.active}>
            <img src={defaultIcon} alt='defaultIcon'/>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
}