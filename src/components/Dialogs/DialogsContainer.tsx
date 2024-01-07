import {sendMessageCreator, updateNewMessageTextCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';

const mapStateToProps = (state: any) => {
  return {
    dialogsPage: state.dialogsPage
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateNewMessageText: (text: string)=>{
      dispatch(updateNewMessageTextCreator(text))
    },
    sendMessage: ()=>{
      dispatch(sendMessageCreator())
    }
  }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer
