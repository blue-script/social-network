import React from 'react';
import {Friend} from './Friend/Friend';
import {mapStateToPropsType} from './FriendsContainer';
import s from "./Friends.module.css"

export const Friends: React.FC<mapStateToPropsType> = (props) => {
    const friends = props.friends.map(f => <Friend key={f.id} id={f.id} name={f.name}/>)

    return <div className={s.container}>
        {friends}
    </div>
}

