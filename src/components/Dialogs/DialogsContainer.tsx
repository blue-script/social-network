import {DialogsPageType, sendMessageCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {compose, Dispatch} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import React from "react";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}

// const AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
