export type FriendType = {
  id: number
  name: string
}
export type SidebarType = {
  friends: FriendType[]
}

const initialState: SidebarType = {
    friends: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Valera'},
      {id: 3, name: 'Sasha'},
    ],
  }
const sidebarReducer = (state: SidebarType = initialState, action: any): SidebarType => {
  switch (action.type) {
    default:
      return state
  }
}
export default sidebarReducer