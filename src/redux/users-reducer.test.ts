import usersReducer, {actions, InitialStateType} from './users-reducer'

let state: InitialStateType

beforeEach(()=>{
  state = {
    users: [
      {
        id: 0, name: '0', status: 'stat 0', followed: false,
        photos: {large: null, small: null}
      },
      {
        id: 1, name: '1', status: 'stat 1', followed: false,
        photos: {large: null, small: null}
      },
      {
        id: 2, name: '2', status: 'stat 2', followed: true,
        photos: {large: null, small: null}
      },
      {
        id: 3, name: '3', status: 'stat 3', followed: true,
        photos: {large: null, small: null}
      }
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  }
})

test('follow success', () => {
    const endState = usersReducer(state, actions.followSuccess(1))

    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
    const endState = usersReducer(state, actions.unfollowSuccess(3))

    expect(endState.users[2].followed).toBeTruthy()
    expect(endState.users[3].followed).toBeFalsy()
})