import React from 'react'
import defaultImage from './defaultimage.jpg'
const NewsItem = (props) => {

  let { title, description, imageUrl, url, author, date } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <img src={imageUrl ? imageUrl : defaultImage} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <a href={url} rel="noopener noreferrer" target='_blank' className="btn btn-sm btn-primary">Read more</a>
          <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} at {new Date(date).toUTCString()}</small></p>
        </div>
      </div>
    </div>
  )
}

export default NewsItem