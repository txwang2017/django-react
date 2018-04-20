import React from 'react'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div>
          <img src="https://s3.amazonaws.com/django-react/404.jpg"
               width="60%"
               height="40%"
               style={{marginLeft: '20%',  marginTop: '2%'}}/>
        </div>
        <div>
          <a href="/" className="text-center" style={{marginTop: '40px'}}>
            <h1> Back to Index </h1>
          </a>
        </div>
      </div>
    )
  }
}
