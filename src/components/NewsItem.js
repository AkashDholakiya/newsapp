import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title,desc,ImgUrl,newsurl} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={ImgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <a href={newsurl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}