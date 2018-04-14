import React from 'react'
import {Link} from 'react-router-dom'

const awsBucket = 'https://s3.amazonaws.com/django-react/'
const defaultAvatar = 'default-avatar.jpg'

const setPubTime = pubTime => {
  let date = new Date(pubTime)
  return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
}

export class PostCard extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.postDetail = this.props.postDetail
    this.postIcon = awsBucket + 'post-icon-' + this.postDetail.uuid
    this.authorAvatar = awsBucket + (this.postDetail.author_avatar || defaultAvatar)
    this.pubTime = new Date(this.postDetail.pub_time)

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
            {setPubTime(this.postDetail.pub_time)}
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

    this.handleNextPage = () => {
      if (this.props.state.nextPage !== null) {
        this.props.actions.fetchPostList(this.props.state.nextPage)
        this.props.actions.setCurrPage(this.props.state.currPage + 1)
      }
    }

    this.handlePreviousPage = () => {
      if (this.props.state.previousPage !== null) {
        this.props.actions.fetchPostList(this.props.state.previousPage)
        this.props.actions.setCurrPage(this.props.state.currPage - 1)
      }
    }

    this.handlePage = (page) => {
      let pageUrl = `/api/posts/list?page=${page}`
      this.props.actions.fetchPostList(pageUrl)
      this.props.actions.setCurrPage(page)
    }

    this.setPagination = () => {
      let pages = []
      const pageSize = 10
      const lowerBound = Math.max(1, this.props.state.currPage - 3)
      const upperBound = Math.min(Math.ceil(this.props.state.postNum / pageSize), this.props.state.currPage + 3)
      if (lowerBound > 1) {
        pages.push(1)
      }
      if (lowerBound > 2) {
        pages.push('...')
      }
      for (let i = lowerBound; i <= upperBound; i++) {
        pages.push(i)
      }
      if (upperBound < Math.ceil(this.props.state.postNum / pageSize) - 1) {
        pages.push('...')
      }
      if (upperBound < Math.ceil(this.props.state.postNum / pageSize)) {
        pages.push(Math.ceil(this.props.state.postNum / pageSize))
      }
      const setPage = page => {
        if (typeof page === 'number') {
          return <a className="page-link" href="#" onClick={() => this.handlePage(page)}>{page}</a>
        } else {
          return <span className="page-link">{page}</span>
        }
      }
      return (
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#" onClick={this.handlePreviousPage}>Previous</a>
          </li>
          {pages.map((page, index) => (
            <li className="page-item" key={index}>
              {setPage(page)}
            </li>
          ))}
          <li className="page-item"><a className="page-link" href="#" onClick={this.handleNextPage}>Next</a></li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div>
        {this.setPagination()}
      </div>
    )
  }
}

export class PostDetail extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.setContent = content => {
      let paragraphs = content.split('\n')
      return (
        paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))
      )
    }
    this.handleLike = () => {
      this.props.actions.likePost(this.props.state.postDetail.uuid)
    }
    this.setLikeButton = () => {
      if (this.props.state.like_active[this.props.state.postDetail.uuid]) {
        return (
          <button className="btn like-button disabled"/>
        )
      } else {
        return (
          <button onClick={this.handleLike} className="btn like-button"/>
        )
      }
    }
  }

  render() {
    let authorAvatar = awsBucket + (this.props.state.postDetail.author_avatar || defaultAvatar)
    return (
      <div className="post-detail">
        <div className="post-meta">
          <div className="post-title">
            <h1>{this.props.state.postDetail.title}</h1>
          </div>
          <div className="header">
            <img src={authorAvatar} height="30" width="30" className="rounded post-author-avatar"/>
            {this.props.state.postDetail.author}
            <img src="https://s3.amazonaws.com/django-react/clock.jpeg" height="25" width="25"
                 className="post-info"/>
            {setPubTime(this.props.state.postDetail.pub_time)}
            <img src="https://s3.amazonaws.com/django-react/thumb.png" height="25" width="25"
                 className="post-info"/>
            {this.props.state.postDetail.like_num}
            <img src="https://s3.amazonaws.com/django-react/read.jpeg" height="25" width="25"
                 className="post-info"/>
            {this.props.state.postDetail.read_num}
            <img src="https://s3.amazonaws.com/django-react/comment.png" height="25" width="25"
                 className="post-info"/>
            {this.props.state.postDetail.comment_num}
          </div>
        </div>

        <div className="article container">
          <div className="row">
            <div className="col-md-15 col-md-offset-2">
              <div className="markdown">
                <h4>
                  {this.setContent(this.props.state.postDetail.content)}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="like-post">
          <ul className="list-inline">
            <li className="list-inline-item">{this.setLikeButton()}</li>
            <li className="list-inline-item"><h5>Like it!</h5></li>
          </ul>
        </div>
      </div>
    )
  }
}