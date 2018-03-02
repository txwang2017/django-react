export const setUserInfo = (userInfo) => {
  return {type: 'SET_USER_INFO', userInfo};
};

const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export const checkAuthentication = () => dispatch => {
  let isAuthenticated = false;
  fetch('/api/accounts/check-authentication/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    },
  }).then(
    response => {
      if (response.status === 200) {
        isAuthenticated = true;
        return response.json();
      } else {
        return {};
      }
    }
  ).then(
    userInfo => {
      userInfo.isAuthenticated = isAuthenticated;
      dispatch(setUserInfo(userInfo));
    }
  )
};

const redirectToIndex = () => {
  let curr_url = window.location.hash;
  if (curr_url === "#/new-post") {
    window.location.hash = "#";
  }
};

export const signOut = () => dispatch => {
  const userInfo = {
    email: '',
    isAuthenticated: false
  };
  fetch('/api/accounts/sign-out/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
    },
  }).then(
    () => {
      dispatch(setUserInfo(userInfo));
    }
  ).then(
    () => {
      redirectToIndex();
    }
  )
};

export const setSignInError = errorMessage => {
  return {type: 'SET_SIGN_IN_ERROR', errorMessage};
};

export const setSignUpError = errorMessage => {
  return {type: 'SET_SIGN_UP_ERROR', errorMessage};
};

export const signUp = (username, email, password1, password2) => dispatch => {
  if (password1 !== password2) {
    dispatch(setSignUpError('Please enter the same password'));
  }
  else {
    let isAuthenticated = false;
    fetch('/api/accounts/sign-up/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "X-CSRFToken": getCookie("csrftoken"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password1, password2})
    }).then(
      response => {
        if (response.status === 200) {
          isAuthenticated = true;
          return response.json();
        } else {
          return response.json();
        }
      }
    ).then(
      userInfo => {
        if (isAuthenticated === true) {
          userInfo.isAuthenticated = isAuthenticated;
          dispatch(setSignUpError(''));
          dispatch(setUserInfo(userInfo));
          dispatch(displaySignUp(false));
        } else {
          dispatch(setSignUpError(userInfo.email));
        }
      }
    ).catch(
      () => {
        dispatch(setSignUpError('Email already existed'));
      }
    )
  }
};

export const signIn = (username, password) => dispatch => {
  let isAuthenticated = false;
  fetch('/api/accounts/sign-in/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password})
  }).then(
    response => {
      if (response.status === 200) {
        isAuthenticated = true;
        return response.json();
      } else {
        return response.json();
      }
    }
  ).then(
    userInfo => {
      console.log(userInfo);
      if (isAuthenticated === true) {
        userInfo.isAuthenticated = isAuthenticated;
        dispatch(setSignInError(''));
        dispatch(setUserInfo(userInfo));
        dispatch(displaySignIn(false));
      } else {
        dispatch(setSignInError('Username/Password is not correct'));
      }
    }
  )
};

export const displaySignIn = displayStatus => ({type: "DISPLAY_SIGN_IN", displayStatus});

export const displaySignUp = displayStatus => ({type: "DISPLAY_SIGN_UP", displayStatus});