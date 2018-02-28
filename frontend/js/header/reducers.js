const initialState = {
  userInfo: {
    email: '',
    isAuthenticated: false,
  },
};

const setUserInfo = (newState, userInfo) => {
  newState.userInfo.email = userInfo.email;
  newState.userInfo.isAuthenticated = userInfo.isAuthenticated;
};

const headerReducer = (state = initialState, actions) => {
  let newState = {};
  Object.assign(newState, state);
  switch (actions.type) {
    case 'SET_USER_INFO':
      setUserInfo(newState, actions.userInfo);
      break;
    default:
      break;
  }
  return newState;
};

export default headerReducer;