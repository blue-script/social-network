import {DialogsPageType, sendMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';

type MapStatePropsType = {
  dialogsPage: DialogsPageType
}
type MapDispatchPropsType = {
  updateNewMessageText: (text: string) => void
  sendMessage: () => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType
const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage
  }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    updateNewMessageText: (text: string) => {
      dispatch(updateNewMessageTextCreator(text))
    },
    sendMessage: () => {
      dispatch(sendMessageCreator())
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
