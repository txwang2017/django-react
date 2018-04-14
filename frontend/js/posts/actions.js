export const getPostList = postList => ({type: 'GET_POST_LIST', postList})

const getCookie = name => {
  let cookieValue = null
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
        break
      }
    }
  }
  return cookieValue
}

export const fetchPostList = (path = '/api/posts/list/') => dispatch => {
  fetch(path, {
    method: 'GET',
  }).then(
    response => {
      return response.json()
    }
  ).then(
    postList => {
      dispatch(getPostList(postList.results))
      dispatch(setPostNum(postList.count))
      dispatch(setNextPage(postList.next))
      dispatch(setPreviousPage(postList.previous))
    }
  )
}

export const setNextPage = nextPage => ({type: 'NEXT_PAGE', nextPage})

export const setPreviousPage = previousPage => ({type: 'PREVIOUS_PAGE', previousPage})

export const setPostNum = postNum => ({type: 'POST_NUM', postNum})

export const setNewPostError = error => ({type: "NEW_POST_ERROR", error})

export const setPostDetail = postDetail => ({type: "POST_DETAIL", postDetail})

export const setPostDetailError = error => ({type: "POST_DETAIL_ERROR", error})

export const addPost = post => ({type: "ADD_POST", post})

export const newPost = (post, icon) => dispatch => {
  let success = false
  if (post.title === "" || post.content === "") {
    dispatch(setNewPostError("title or content cannot be blank"))
  } else {
    fetch('/api/posts/list/', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify(post)
    }).then(
      response => {
        if (response.status === 200) {
          success = true
          return response.json()
        }
      }
    ).then(
      post => {
        if (success === true) {
          dispatch(addPost(post))
          if(icon){
            dispatch(uploadPostIcon(icon, post.uuid))
          }
          window.location.hash = '#'
        } else {
          dispatch(setNewPostError("please log in first"))
        }
      }
    )
  }
}

export const fetchPostDetail = uuid => dispatch => {
  let success = false
  fetch(`/api/posts/${uuid}/`).then(
    response => {
      if (response.status === 200) {
        success = true
        return response.json()
      }
    }
  ).then(
    postDetail => {
      if (success) {
        dispatch(setPostDetail(postDetail))
      } else {
        dispatch(setPostDetailError("the post no longer exist"))
      }
    }
  )
}

export const addComment = comment => ({type: "ADD_COMMENT", comment})

export const setCommentError = error => ({type: "COMMENT_ERROR", error})

export const newComment = (comment, uuid) => dispatch => {
  let path = `/api/posts/${uuid}/`
  let success = false
  fetch(path, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(comment)
  }).then(
    response => {
      if (response.status === 200) {
        success = true
        return response.json()
      }
    }
  ).then(
    comment => {
      if (success === true) {
        dispatch(addComment(comment))
      } else {
        dispatch(setCommentError("An error occurred..."))
      }
    }
  )
}

export const setPostIconName = iconName => ({type: 'SET_POST_ICON_NAME', iconName})

export const uploadPostIcon = (icon, uuid) => dispatch => {
  fetch(`/api/posts/${uuid}/upload-icon/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Disposition': `attachment; filename=${uuid}`,
      'Accept': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
      'Content-Type': 'application/octet-stream'
    },
    body: icon,
  }).then(
    response => response.json()
  )
}

export const setCurrPage = currPage => ({type: 'SET_CURR_PAGE', currPage})

export const setLikePost = uuid => ({type: 'SET_LIKE_POST', uuid})

export const likePost = uuid => dispatch => {
  fetch(`/api/posts/${uuid}/like/`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "X-CSRFToken": getCookie("csrftoken"),
    },
  }).then(
    response => response.json()
  ).then(
    dispatch(setLikePost(uuid))
  )
}