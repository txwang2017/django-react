import React from "react"
import {PostCard, PostPagination, PostDetail, CommentCard, NewComment} from "./components"

export class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
  }

  componentDidMount() {
    if (this.props.state.postList.length === 0) {
      this.props.actions.fetchPostList()
    }
  }

  render() {
    return (
      <div>
        {this.props.state.postList.map(post => (
          <PostCard postDetail={post} key={post.uuid}/>
        ))}
        <PostPagination state={this.props.state} actions={this.props.actions}/>
      </div>
    )
  }
}

export class NewPost extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.newPost = {
      title: "",
      content: "",
    }
    this.icon = null

    this.handlePostTitleChange = title => {
      this.newPost.title = title.target.value
    }

    this.handlePostContentChange = content => {
      this.newPost.content = content.target.value
    }

    this.handleIcon = icon => {
      this.icon = icon.target.files[0]
      this.props.actions.setPostIconName(this.icon.name)
      const reader = new FileReader()
      reader.onload = () => {
        this.icon = reader.result
      }
      reader.readAsArrayBuffer(this.icon)
    }

    this.handleSubmit = () => {
      this.props.actions.newPost(this.newPost, this.icon)
    }
  }

  render() {
    return (
      <form id="new-post">
        <p>
          <input type="text" className="form-control" placeholder="Title" onChange={this.handlePostTitleChange}/>
        </p>
        <p>
          <textarea id="new-post-content" className="form-control" placeholder="Content"
                    onChange={this.handlePostContentChange}/>
        </p>
        <p>
          <input type="file" id="upload-icon" className="form-control" accept="image/png, image/jpeg"
                 onChange={this.handleIcon}/>
        </p>
        <p>{this.props.state.newPostError}</p>
        <button className="btn btn-primary" onClick={this.handleSubmit}>publish
        </button>
      </form>
    )
  }
}

export class PostComments extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.uuid = this.props.uuid

    this.handleNextPage = () => {
      this.props.actions.fetchComments(null, this.props.state.commentNext)
    }

    this.setNextButton = () => {
      let n = this.props.state.postDetail.comment_num - this.props.state.comments.length
      if (n > 0) {
        return (
          <div className="text-center">
            <button id="show-more-comments" className="btn btn-light btn-lg" onClick={this.handleNextPage}>Show more ({n})</button>
          </div>
        )
      } else {
        return null
      }
    }
  }


  componentDidMount() {
    this.props.actions.fetchPostDetail(this.uuid)
  }

  render() {
    return (
      <div>
        <PostDetail state={this.props.state} actions={this.props.actions} uuid={this.uuid}/>
        {this.props.state.comments.map((comment, index) => (
          <CommentCard comment={comment} key={comment.uuid}/>
        ))}
        {this.setNextButton()}
      </div>
    )
  }
}
