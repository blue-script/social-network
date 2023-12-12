import React from 'react';

export type FriendType = {
  id: number
  name: string
}
export const Friend: React.FC<FriendType> = (props) => {
  return <div style={{padding: '5px'}}>
    <img
      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf8ZaLUTA2vEGXFAah4FD0Xvpt7kK3l5gmhMDvPcQG6qu65IuvVJxi3_OofRKdB0AvP4Y&usqp=CAU'
      alt='' style={{borderRadius: '50%', width: '30px', height: '30px'}}/>
    <div>{props.name}</div>
  </div>
}