import {actions, follow, unfollow} from './users-reducer'
import {usersApi} from '../api/users-api'
import {ResultCodes} from '../enums/enums'
import {APIResponseType} from '../api/api'

jest.mock('../api/users-api')
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>

const result: APIResponseType = {
  resultCode: ResultCodes.Success,
  messages: [],
  data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=> {
  dispatchMock.mockClear()
  getStateMock.mockClear()
})

test('success follow thunk', async () => {
  usersApiMock.follow.mockReturnValue(Promise.resolve(result))

  const thunk = follow(1)
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(1, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(1, false))
})

test('success unfollow thunk', async () => {
  usersApiMock.unfollow.mockReturnValue(Promise.resolve(result))

  const thunk = unfollow(1)
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(1, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(1, false))
})
