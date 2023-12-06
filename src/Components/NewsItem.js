import React, { Component } from 'react'

export class NewsItem extends Component {

  
  render() {
    
    let {title, description, imageurl,newsurl,author,date,source} = this.props;
    return (
    <div>

    
     <div className='container my-3'>
      <div style={{position:"absolute",zIndex:"1",display:"flex"}}>
     <span class="badge badge-primary" >{source}</span>
     </div>
        <div className="card" >
  <img src={!imageurl?"https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=1024x1024&w=is&k=20&c=-AdIwLn-nIYlgctc95CZuJHnkku_ia-f8A8m2LFwl2A=":imageurl} className="card-img-top" alt="..."/>
  
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class="card-text"><small class="text-muted">Author <b>{!author?"unknown":author}</b> Date {!date?"Not available":new Date(date).toGMTString()}</small></p>
    <a rel='noreferrer' href={newsurl}  target="_blank"className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
</div>

    </div>
    )
  }
}

export default NewsItem