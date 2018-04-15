const initialState = {
  postList: [],
  newPostError: "",
  newCommentError: "",
  postDetail: {
    author: "",
    pub_time: "",
    title: "",
    content: "",
    like_num: null,
    dislike_num: null,
    comment_num: null,
  },
  comments: [],
  like_active: {},
  postIconName: 'upload an picture for your post',
  postDetailError: "",
  commentError: "",
  nextPage: null,
  previousPage: null,
  commentNext: null,
  currPage: 1,
  postNum: 0,
  postListUrl: '/api/posts/list/'
}

const postPageSize = 10
const commentPageSize = 5

const postReducer = (state = initialState, actions) => {
  let newState = {}
  Object.assign(newState, state)
  switch (actions.type) {
    case "GET_POST_LIST":
      newState.postList = actions.postList
      break
    case "ADD_POST":
      let newList = [actions.post].concat(newState.postList)
      if(newList.length > postPageSize){
        newList.pop()
      }
      newState.postList = newList
      break
    case "NEW_POST_ERROR":
      newState.newPostError = actions.error
      break
    case "POST_DETAIL":
      newState.postDetail = actions.postDetail
      break
    case "POST_DETAIL_ERROR":
      newState.postDetailError = actions.error
      break
    case "ADD_COMMENT":
      let newComments = [actions.comment].concat(newState.comments)
      newState.comments = newComments
      break
    case "COMMENT_ERROR":
      newState.commentError = actions.error
      break
    case "NEXT_PAGE":
      newState.nextPage = actions.nextPage
      break
    case "PREVIOUS_PAGE":
      newState.previousPage = actions.previousPage
      break
    case "POST_NUM":
      newState.postNum = actions.postNum
      break
    case "SET_POST_ICON_NAME":
      newState.postIconName = actions.iconName
      break
    case "SET_CURR_PAGE":
      newState.currPage = actions.currPage
      break
    case "SET_LIKE_POST":
      newState.postDetail.like_num += 1
      newState.like_active[actions.uuid] = true
      break
    case "SET_COMMENTS":
      newState.comments = newState.comments.concat(actions.comments)
      break
    case "CLEAR_COMMENTS":
      newState.comments = []
      break
    case "SET_COMMENT_NEXT":
      newState.commentNext = actions.commentNext
      break
    case "SET_POSTLIST_URL":
      newState.postListUrl = actions.url
      break
    default:
      break
  }
  return newState
}

export default postReducer