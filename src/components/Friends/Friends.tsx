import React from 'react';
import {Friend, FriendType} from './Friend/Friend';

export type FriendsType = {
  friends: FriendType[]
}
export const Friends: React.FC<FriendsType> = (props) => {
  const friends = props.friends.map(f=> <Friend key={f.id} id={f.id} name={f.name}/>)
  return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    {friends}
  </div>
}

