import React from 'react';

export type FriendType = {
  id: string
  name: string
}
export type FriendsType = {
  friends: FriendType[]
}
export const Friends: React.FC<FriendsType> = (props) => {
  const friends = props.friends.map(f=> <Friend key={f.id} id={f.id} name={f.name}/>)
  return <div style={{display: 'flex', flexWrap: 'wrap'}}>
    {friends}
  </div>
}

export const Friend: React.FC<FriendType> = (props) => {
  return <div style={{padding: '5px'}}>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8ZaLUTA2vEGXFAah4FD0Xvpt7kK3l5gmhMDvPcQG6qu65IuvVJxi3_OofRKdB0AvP4Y&usqp=CAU"
      alt="" style={{borderRadius: '50%', width: '30px', height: '30px'}}/>
    <div>{props.name}</div>
  </div>
}