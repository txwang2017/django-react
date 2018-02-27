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
    }
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

const accountReducer = (state = initialState, actions) => {
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
        default:
            break;
    }
    return newState;
};

export default accountReducer;