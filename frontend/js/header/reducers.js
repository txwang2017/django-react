const initialState = {
  userInfo: {
    email: '',
    isAuthenticated: false,
  },
  signInError: {
    errorMessage: ''
  },
  signUpError: {
    errorMessage: ''
  },
  signUpDisplay: false,
  signInDisplay: false
};

const setUserInfo = (newState, userInfo) => {
  newState.userInfo.email = userInfo.email;
  newState.userInfo.isAuthenticated = userInfo.isAuthenticated;
};

const setSignInError = (newState, errorMessage) => {
  newState.signInError.errorMessage = errorMessage;
};

const setSignUpError = (newState, errorMessage) => {
  newState.signUpError.errorMessage = errorMessage;
};

const setSignInDisplay = (newState, status) => {
  newState.signInDisplay = status;
};

const setSignUpDisplay = (newState, status) => {
  newState.signUpDisplay = status;
};

const headerReducer = (state = initialState, actions) => {
  let newState = {};
  Object.assign(newState, state);
  switch (actions.type) {
    case 'SET_USER_INFO':
      setUserInfo(newState, actions.userInfo);
      break;
    case 'SET_SIGN_UP_ERROR':
      setSignUpError(newState, actions.errorMessage);
      break;
    case 'SET_SIGN_IN_ERROR':
      setSignInError(newState, actions.errorMessage);
      break;
    case 'DISPLAY_SIGN_IN':
      setSignInDisplay(newState, actions.displayStatus);
      break;
    case 'DISPLAY_SIGN_UP':
      setSignUpDisplay(newState, actions.displayStatus);
      break;
    default:
      break;
  }
  return newState;
};

export default headerReducer;