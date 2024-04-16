const initialState = {
    friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Sasha'},
    ],
}
type initialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}
export default sidebarReducer