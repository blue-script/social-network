import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {compose} from 'redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import React from "react";
import {DialogsPageType} from "../../types/types";
import {dialogsActions} from "../../redux/dialogs-reducer";

type MapStatePropsType = {
    dialogsPage: DialogsPageType
}
type MapDispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsProps = MapStatePropsType & MapDispatchPropsType
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...dialogsActions}),
    withAuthRedirect
)(Dialogs)
