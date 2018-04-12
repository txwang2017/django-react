const initialState = {
  userInfo: {
    email: '',
    isAuthenticated: false,
    avatar: null,
  },
  signInError: '',
  signUpError: '',
  displayContent: 'sign-in',
  avatarName: 'Upload avatar (optional)',
}

const setUserInfo = (newState, userInfo) => {
  newState.userInfo.email = userInfo.email
  newState.userInfo.isAuthenticated = userInfo.isAuthenticated
  newState.userInfo.avatar = userInfo.avatar
}

const setSignInError = (newState, errorMessage) => {
  newState.signInError = errorMessage
}

const setSignUpError = (newState, errorMessage) => {
  newState.signUpError = errorMessage
}

const setDisplayContent = (newState, content) => {
  newState.displayContent = content
}

const setAvatarName = (newState, avatarName) => {
  newState.avatarName = avatarName
}

const headerReducer = (state = initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch (actions.type) {
    case 'SET_USER_INFO':
      setUserInfo(newState, actions.userInfo)
      break
    case 'SET_SIGN_UP_ERROR':
      setSignUpError(newState, actions.errorMessage)
      break
    case 'SET_SIGN_IN_ERROR':
      setSignInError(newState, actions.errorMessage)
      break
    case 'DISPLAY_CONTENT':
      setDisplayContent(newState, actions.content)
      break
    case 'SET_AVATAR_NAME':
      setAvatarName(newState, actions.avatarName)
      break
    default:
      break
  }
  return newState
}

export default headerReducer