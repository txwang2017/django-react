const initialState = {
    postList: [],
    newPostError: "",
    newCommentError: "",
    postDetail: {
        author: "",
        pub_time: "",
        title: "",
        content: "",
        comments: [],
    },
    postDetailError: "",
    commentError: ""
};

const postReducer = (state=initialState, actions) => {
    let newState = {};
    Object.assign(newState, state);
    switch(actions.type){
        case "GET_POST_LIST":
            newState.postList = actions.postList;
            break;
        case "ADD_POST":
            newState.postList.push(actions.post);
            break;
        case "NEW_POST_ERROR":
            newState.newPostError = actions.error;
            break;
        case "POST_DETAIL":
            newState.postDetail = actions.postDetail;
            break;
        case "POST_DETAIL_ERROR":
            newState.postDetailError = actions.error;
            break;
        case "ADD_COMMENT":
            newState.postDetail.comments.push(actions.comment);
            break;
        case "COMMENT_ERROR":
            newState.commentError = actions.error;
            break;
        default:
            break;
    }
    return newState;
};

export default postReducer;