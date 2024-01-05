import {SidebarType} from './redux-store';

const initialState = {
    friends: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Valera'},
      {id: 3, name: 'Sasha'},
    ],
  }
const sidebarReducer = (state: SidebarType = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}
export default sidebarReducer