import {getUserProfile, getUserStatus, profileActions} from './profile-reducer'
import {profileAPI, ProfileRequestType} from '../api/profile-api'

jest.mock('../api/profile-api')
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
})

test('success getUserProfile thunk', async () => {
  const result: ProfileRequestType = {
    aboutMe: 'string',
    contacts: {
      facebook: '',
      github: '',
      instagram: '',
      mainLink: '',
      twitter: '',
      vk: '',
      website: '',
      youtube: ''
    },
    lookingForAJob: false,
    lookingForAJobDescription: 'string',
    fullName: 'string',
    userId: 1,
    photos: {
      large: '',
      small: ''
    },
  }
  profileAPIMock.getProfile.mockReturnValue(Promise.resolve(result))

  const thunk = getUserProfile('1')
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserProfile(result))

})

test('success getUserStatus thunk', async () => {
  const result: string = 'success'
  profileAPIMock.getStatus.mockReturnValue(Promise.resolve(result))

  const thunk = getUserStatus('1')
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(1)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setStatus(result))
})