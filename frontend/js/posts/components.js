import React from 'react'
import {Link} from 'react-router-dom'

const awsBucket = 'https://s3.amazonaws.com/django-react/'
const defaultAvatar = 'default-avatar.jpg'

const getCurrPage = () => {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === 'page') {
      return pair[1]
    }
  }
  return 1
}

export class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.postDetail = this.props.postDetail
    this.postIcon = awsBucket + 'post-icon-' + this.postDetail.uuid
    this.authorAvatar = awsBucket + (this.postDetail.author_avatar || defaultAvatar)
    this.pubTime = new Date(this.postDetail.pub_time)
    console.log(this.postDetail)

    this.setPubTime = pubTime => {
      let date = new Date(pubTime)
      return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
    }

    this.setContent = content => {
      let temp = content.split(' ')
      const textLength = 45
      if (temp.length < textLength) {
        return content
      } else {
        return temp.splice(0, textLength).join(' ') + '.......'
      }
    }

    this.setIcon = () => {
      if (this.postDetail.icon) {
        return (
          <div className="media-left">
            <img src={this.postIcon} height="140" width="200" className="rounded"/>
          </div>
        )
      } else {
        return null
      }
    }
  }

  render() {
    return (
      <div className="media">
        {this.setIcon()}

        <div className="media-body">
          <Link to={`/post-detail/${this.postDetail.uuid}`} style={{textDecoration: 'none', color: 'black'}}>
            <div className="media-heading">
              <h3>{this.postDetail.title}</h3>
            </div>
          </Link>
          <div className="description" style={{color: 'grey'}}>
            {this.setContent(this.postDetail.content)}
          </div>
          <div className="info">
            <img src={this.authorAvatar} height="30" width="30" className="rounded post-author-avatar"/>
            {this.postDetail.author}
            <img src="https://s3.amazonaws.com/django-react/clock.jpeg" height="25" width="25"
                 className="post-info"/>
            {this.setPubTime(this.postDetail.pub_time)}
            <img src="https://s3.amazonaws.com/django-react/thumb.png" height="25" width="25"
                 className="post-info"/>
            {this.postDetail.like_num}
            <img src="https://s3.amazonaws.com/django-react/read.jpeg" height="25" width="25"
                 className="post-info"/>
            {this.postDetail.read_num}
            <img src="https://s3.amazonaws.com/django-react/comment.png" height="25" width="25"
                 className="post-info"/>
            {this.postDetail.comment_num}
          </div>
        </div>
      </div>

    )
  }
}

export class NewComment extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.uuid = this.props.uuid
    this.comment = {
      content: ""
    }
    this.handleContentChange = content => {
      this.comment.content = content.target.value
    }

    this.handleSubmit = () => {
      this.props.actions.newComment(this.comment, this.uuid)
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
      return null
    }
  }
}

export class PostPagination extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

    console.log(this.props.state.postNum)
    console.log(this.props.state.previousPage)

    this.currPage = getCurrPage()
    const pageSize = 2
    this.pageNum = Math.ceil(this.props.state.count / pageSize)

    this.handleNextPage = () => {
      if (this.props.state.nextPage !== null) {
        this.props.actions.fetchPostList(this.props.state.nextPage)
      }
    }

    this.handlePreviousPage = () => {
      if (this.props.state.previousPage !== null) {
        this.props.actions.fetchPostList(this.props.state.previousPage)
      }
    }

    this.setPagination = () => {
      const lowerBound = Math.max(1, this.currPage - 3)
      const higherBound = Math.min(this.pageNum, this.currPage + 3)

    }
  }

  render() {
    return (
      <ul id="pagination" className="inline">
        <li id="previous-page">
          <button className="btn" onClick={this.handlePreviousPage}>&laquo</button>
        </li>
        <li id="next-page">
          <button className="btn" onClick={this.handleNextPage}>&raquo</button>
        </li>
      </ul>
    )
  }
}