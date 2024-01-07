import React from 'react';
import {Friend, FriendType} from './Friend/Friend';
import {Friends} from './Friends';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';

export type mapStateToPropsType = {
  friends: FriendType[]
}
const mapStateToProps = (state: AppRootStateType):mapStateToPropsType => {
  return {
    friends: state.sidebar.friends
  }
}

 const FriendsContainer= connect(mapStateToProps)(Friends)

export default FriendsContainer