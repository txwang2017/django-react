import React from 'react';
import {Link} from 'react-router-dom'

export class PostList extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.handleNextPage = () => {
      if (this.props.state.nextPage !== null) {
        this.props.actions.fetchPostList(this.props.state.nextPage);
      }
    };

    this.handlePreviousPage = () => {
      if (this.props.state.previousPage !== null) {
        this.props.actions.fetchPostList(this.props.state.previousPage);
      }
    }
  }

  componentWillMount() {
    if(this.props.state.postList.length === 0){
      this.props.actions.fetchPostList();
    }
  }

  render() {
    return (
      <div>
        <table className="table table-hover" id="post-list">
          <tbody>
          {this.props.state.postList.map(post => {
            let pubTime = new Date(post.pub_time);
            let path = `/post-detail/${post.uuid}`;
            return (
              <tr className="post-info" key={post.uuid}>
                <td className="post-author">{post.author}</td>
                <td className="post-title">
                  <Link to={path}>{post.title}</Link>
                </td>
                <td className="post-pub-time">{pubTime.toLocaleDateString() + "  " + pubTime.toLocaleTimeString()}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <ul id="pagination" className="inline">
          <li id="previous-page">
            <button className="btn" onClick={this.handlePreviousPage}>&laquo;</button>
          </li>
          <li id="next-page">
            <button className="btn" onClick={this.handleNextPage}>&raquo;</button>
          </li>
        </ul>
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

    this.handlePostTitleChange = title => {
      this.newPost.title = title.target.value;
    };

    this.handlePostContentChange = content => {
      this.newPost.content = content.target.value;
    };

    this.handleSubmit = () => {
      this.props.actions.newPost(this.newPost);
    }
  };

  render() {
    return (
      <div id="new-post">
        <p><input type="text"
                  id="new-post-title"
                  placeholder="Title"
                  onChange={this.handlePostTitleChange}/>
        </p>
        <p><textarea id="new-post-content"
                     placeholder="Content"
                     onChange={this.handlePostContentChange}/>
        </p>
        <p>{this.props.state.newPostError}</p>
        <button id="new-post-submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}>publish
        </button>
      </div>
    )
  }
}

export class PostDetail extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.uuid = this.props.uuid;
  }

  componentWillMount() {
    this.props.actions.fetchPostDetail(this.uuid);
  }

  render() {
    let publishTime = new Date(this.props.state.postDetail.pub_time);
    publishTime = publishTime.toLocaleDateString() + "  " + publishTime.toLocaleTimeString();
    const comments = this.props.state.postDetail.comments;
    return (
      <div id="post-detail">
        <pre id="post-detail-info">
          <div id="post-detail-title">{this.props.state.postDetail.title}</div>
          <div id="post-detail-author">{this.props.state.postDetail.author}</div>
          <div id="post-detail-publish-time">published at: {publishTime}</div>
          <div id="post-detail-content">{this.props.state.postDetail.content}</div>
        </pre>
        <div id="post-detail-comments">
          {comments.map(comment => {
            let commentTime = new Date(comment.pub_time);
            commentTime = commentTime.toLocaleDateString() + "  " + commentTime.toLocaleTimeString();
            return (
              <div className="well" key={comment.uuid} id={`comment-${comment.uuid}`}>
                <ul className="inline">
                  <li className="comment-author">{comment.author}</li>
                  <li className="comment-time">{commentTime}</li>
                </ul>
                <div className="comment-content">{comment.content}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.uuid = this.props.uuid;
    this.comment = {
      content: ""
    };
    this.handleContentChange = content => {
      this.comment.content = content.target.value;
    };

    this.handleSubmit = () => {
      this.props.actions.newComment(this.comment, this.uuid);
    }
  }

  render() {
    if (this.props.state.header.userInfo.isAuthenticated === true) {
      return (
        <div id="new-comment">
          <textarea id="comment-content"
                    placeholder="comment....."
                    onChange={this.handleContentChange}/>
          <p id="comment-error">{this.props.state.post.commentError}</p>
          <button id="submit-comment" className="btn" onClick={this.handleSubmit}>comment</button>
        </div>
      )
    } else {
      return null;
    }
  }
}