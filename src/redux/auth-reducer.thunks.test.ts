import {authActions, getAuthUserData} from './auth-reducer'
import {authAPI, AuthType} from '../api/auth-api'
import {APIResponseType} from '../api/api'
import {actions} from './users-reducer'

jest.mock('../api/auth-api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
})

test('success getAuthUserData thunk', async () => {
  const result: APIResponseType<AuthType> = {
    resultCode: 0,
    messages: [],
    data: {id: 1, login: '1', email: '1', isAuth: true, captchaUrl: ''}
  }
  const res = authAPIMock.me.mockReturnValue(Promise.resolve(result))

  const thunk = getAuthUserData()
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setAuthUserData(result.data, true))
})