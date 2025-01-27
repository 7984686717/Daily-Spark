import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props
    return (
      <div className='my-3 container'>
        <div className="card">
  <img src={imageUrl ? imageUrl : "https://www.alamy.com/blog/wp-content/uploads/2016/11/E4G70X-1024x683.jpg"}  alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}