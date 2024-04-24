import {AppRootStateType, InferActionsType} from './redux-store'
import {AnyAction} from 'redux'
import {ThunkDispatch} from 'redux-thunk'
import {getAuthUserData} from './auth-reducer'

const initialState = {
  initialized: false
}
export type initialStateType = typeof initialState

const appReducer = (state = initialState, action: AppActionsType): initialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED-SUCCESS':
      return {...state, initialized: true}
    default: {
      return state
    }
  }
}

const actions = {
  initializedSuccess: () => ({type: 'SN/APP/INITIALIZED-SUCCESS'}) as const
}
export type AppActionsType = InferActionsType<typeof actions>

export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
  dispatch(getAuthUserData())
    .then(() => dispatch(actions.initializedSuccess()))

}

export default appReducer