import {getPostList, setNextPage, setPostNum, setPreviousPage, setPostListUrl} from '../posts/actions'

const awsBucket = 'https://s3.amazonaws.com/django-react/'

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
      if(userInfo.avatar === '' || userInfo.avatar === null){
        userInfo.avatar = 'default-avatar.jpg'
      }
      userInfo.avatar = awsBucket + userInfo.avatar
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

const uploadAvatar = (username, avatar) => {
  fetch('/api/accounts/upload-avatar/', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Disposition': `attachment; filename=${username}`,
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/octet-stream'
    },
    body: avatar,
  }).then(
    response => response.json()
  )
}

export const signUp = (username, email, password1, password2, avatar) => dispatch => {
  const signUpClose = document.getElementById('sign-up-close')
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
        if (response.err) {
          let error = ''
          if (response.email) {
            error += response.email
          }
          if (response.username) {
            error += 'username already exists. '
          }
          if (response.password1) {
            error += response.password1
          }
          dispatch(setSignUpError(error))
          return
        }
        signUpClose.click()
        let userInfo = response
        userInfo.isAuthenticated = true
        userInfo.avatar = awsBucket + userInfo.avatar
        dispatch(setSignUpError(''))
        dispatch(setUserInfo(userInfo))
        dispatch(uploadAvatar(username, avatar))
      }
    ).catch(
      err => {
        dispatch(setSignUpError(err))
      }
    )
  }
}

export const signIn = (username, password) => dispatch => {
  const signInClose = document.getElementById('sign-in-close')
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
      if (response.err) {
        dispatch(setSignInError(response.err))
        return
      }
      signInClose.click()
      let userInfo = response
      userInfo.isAuthenticated = true
      userInfo.avatar = awsBucket + userInfo.avatar
      dispatch(setSignInError(''))
      dispatch(setUserInfo(userInfo))
    }
  )
}

export const setDisplay = content => ({type: "DISPLAY_CONTENT", content})

export const search = keywords => dispatch => {
  // window.location.hash = "#"
  const path = `/api/search/?keywords=${keywords}`
  fetch(path, {
    method: "GET",
  }).then(
    response => response.json()
  ).then(
    postList => {
      dispatch(getPostList(postList.results))
      dispatch(setNextPage(postList.next))
      dispatch(setPreviousPage(postList.previous))
      dispatch(setPostNum(postList.count))
      dispatch(setPostListUrl(path))
    }
  )
}

export const setAvatarName = avatarName => ({type: 'SET_AVATAR_NAME', avatarName})