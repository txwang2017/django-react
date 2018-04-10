import {getPostList, setNextPage, setPostNum, setPreviousPage} from '../posts/actions'

export const setUserInfo = (userInfo) => {
  return {type: 'SET_USER_INFO', userInfo}
}

const getCookie = name => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break;
      }
    }
  }
  return cookieValue
}

export const checkAuthentication = () => dispatch => {
  let isAuthenticated = false
  fetch('/api/accounts/check-authentication/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    },
  }).then(
    response => response.json()
  ).then(
    response => {
      if (response.err) {
        return
      }
      let userInfo = response
      userInfo.isAuthenticated = true
      dispatch(setUserInfo(userInfo))
    }
  )
}

const redirectToIndex = () => {
  let curr_url = window.location.hash
  if (curr_url === "#/new-post") {
    window.location.hash = "#"
  }
}

export const signOut = () => dispatch => {
  const userInfo = {
    email: '',
    isAuthenticated: false
  }
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
      dispatch(setUserInfo(userInfo))
    }
  ).then(
    () => {
      redirectToIndex()
    }
  )
}

export const setSignInError = errorMessage => {
  return {type: 'SET_SIGN_IN_ERROR', errorMessage}
}

export const setSignUpError = errorMessage => {
  return {type: 'SET_SIGN_UP_ERROR', errorMessage}
}

export const signUp = (username, email, password1, password2) => dispatch => {
  if (password1 !== password2) {
    dispatch(setSignUpError('Please enter the same password'))
  }
  else {
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
      response => response.json()
    ).then(
      response => {
        if(response.err){
          let error = ''
          if(response.email){
            error += response.email
          }
          if(response.username){
            error += 'username already exists. '
          }
          if(response.password1){
            error += response.password1
          }
          dispatch(setSignUpError(error))
          return
        }
        let userInfo = response
        userInfo.isAuthenticated = true
        dispatch(setSignUpError(''))
        dispatch(setUserInfo(userInfo))
        dispatch(displaySignUp(false))
        $('#popUpWindow').modal('hide')
      }
    ).catch(
      err => {
        dispatch(setSignUpError(err))
      }
    )
  }
}

export const signIn = (username, password) => dispatch => {
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
    response => response.json()
  ).then(
    response => {
      if(response.err){
        dispatch(setSignInError(response.err))
        return
      }
      let userInfo = response
      userInfo.isAuthenticated = true
      dispatch(setSignInError(''))
      dispatch(setUserInfo(userInfo))
      dispatch(displaySignIn(false))
      $('#popUpWindow').modal('hide')
    }
  )
}

export const setDisplay = content => ({type: "DISPLAY_CONTENT", content})

export const search = keywords => dispatch => {
  window.location.hash = "#"
  fetch('/api/search/', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(keywords)
  }).then(
    response => response.json()
  ).then(
    postList => {
      dispatch(getPostList(postList.results))
      dispatch(setNextPage(postList.next))
      dispatch(setPreviousPage(postList.previous))
      dispatch(setPostNum(postList.count))
    }
  )
}