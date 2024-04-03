import React from 'react';
import defaultIcon from "../../../assets/images/defaultUserPhoto.png"
import s from "../Friends.module.css"

export const Friend: React.FC<FriendType> = (props) => {
    return <div className={s.friendContainer}>
        <img src={defaultIcon} alt=''/>
        <div>{props.name}</div>
    </div>
}

// types
export type FriendType = {
    id: number
    name: string
}