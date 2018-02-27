import React from 'react';
import {Link} from 'react-router-dom'

export class PostList extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    componentWillMount() {
        this.props.actions.fetchPostList();
    }

    render() {
        return (
            <div id="post-list">
                {this.props.state.postList.map(post => {
                    let pubTime = new Date(post.pub_time);
                    let path = `/post-detail/${post.uuid}`;
                    return (
                        <Link to={path} key={post.uuid}>
                            <ul className="inline">
                                <li className="post-title">{post.title}</li>
                                <li className="post-author">{post.author}</li>
                                <li className="post-pub-time">{pubTime.toLocaleDateString() + "  " + pubTime.toLocaleTimeString()}</li>
                            </ul>
                        </Link>
                    )
                })}
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
                <p><input type="text"
                          id="new-post-content"
                          placeholder="Content"
                          onChange={this.handlePostContentChange}/>
                </p>
                <p>{this.props.state.newPostError}</p>
                <button className="btn btn-primary" onClick={this.handleSubmit}>publish</button>
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
                <div id="post-detail-title">title: {this.props.state.postDetail.title}</div>
                <div id="post-detail-author">author: {this.props.state.postDetail.author}</div>
                <div id="post-detail-publish-time">time: {publishTime}</div>
                <div id="post-detail-content">content: {this.props.state.postDetail.content}</div>
                <div id="post-detail-comments">
                    {comments.map(comment => {
                        let commentTime = new Date(comment.pub_time);
                        commentTime = commentTime.toLocaleDateString() + "  " + commentTime.toLocaleTimeString();
                        return (
                            <ul className="inline" key={comment.uuid} id={`comment-${comment.uuid}`}>
                                <li id="comment-author">{comment.author}</li>
                                <li id="comment-content">{comment.content}</li>
                                <li id="comment-time">{commentTime}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export class NewComment extends React.Component{
    constructor(props){
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

    render(){
        return (
            <div id="new-comment">
                <input type="text" onChange={this.handleContentChange}/>
                <p id="comment-error">{this.props.state.commentError}</p>
                <button onClick={this.handleSubmit}>comment</button>
            </div>
        )
    }
}