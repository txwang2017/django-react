import React from "react"
import {PostCard, PostPagination, PostDetail} from "./components"

export class PostList extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
  }

  componentWillMount() {
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
    super();
    this.props = props;
    this.newPost = {
      title: "",
      content: "",
    };
    this.icon = null

    this.handlePostTitleChange = title => {
      this.newPost.title = title.target.value;
    };

    this.handlePostContentChange = content => {
      this.newPost.content = content.target.value;
    };

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
      this.props.actions.newPost(this.newPost, this.icon);
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

export class Post extends React.Component {

  constructor(props) {
    super(props)
    this.props = props
    this.uuid = this.props.uuid
  }

  componentWillMount() {
    this.props.actions.fetchPostDetail(this.uuid)
  }

  render() {
    return (
      <span>
        <PostDetail state={this.props.state} actions={this.props.actions}/>
      </span>
    )
  }
}
