import React from 'react';

export class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.postDetail = this.props.postDetail
    console.log(this.postDetail)
  }

  render() {
    return (<h1>xxx</h1>)
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