import React from 'react';

export type FriendType = {
  id: number
  name: string
}
export const Friend: React.FC<FriendType> = (props) => {
  return <div style={{padding: '5px'}}>
    <img
      src='https://www.transparentpng.com/thumb/human/black-human-user-profile-png-icon-free-fsR5FT.png'
      alt='' style={{borderRadius: '50%', width: '30px', height: '30px'}}/>
    <div>{props.name}</div>
  </div>
}