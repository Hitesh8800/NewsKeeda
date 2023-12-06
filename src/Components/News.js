import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize:8,
    category:"general"

  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(){
    super();
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  
  }
  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05a0e2eaafae425387a6e9dcf84ce3af&page=${1}&pageSize=${this.props.pageSize}` ;
    let data = await fetch(url);
    this.setState({loading:true})
    let parsedData = await data.json();
    console.log(parsedData)
   this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults,loading:false})
    
 }
 handlenextclick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05a0e2eaafae425387a6e9dcf84ce3af&page=${this.state.page+1}&pageSize=${this.props.pageSize}` ;
    let data = await fetch(url);
    this.setState({loading:true})
    let parsedData = await data.json();
   

  this.setState({
    page:this.state.page+1,
    articles:parsedData.articles,
    loading:false

  })
     }
     handlepreclick= async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=05a0e2eaafae425387a6e9dcf84ce3af&page=${this.state.page-1}&pageSize=${this.props.pageSize}` ;
        let data = await fetch(url);
        this.setState({loading:true})
        let parsedData = await data.json();
       
    
      this.setState({
        page:this.state.page-1,
        articles:parsedData.articles
        ,loading:false
     })
    }

  render() {
    
    return (
      <div className="container my-3">
        <h1 className="text-center">News Top Headlines</h1>
    {this.state.loading &&  <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,80):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}

          
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button"onClick={this.handlepreclick} className="btn btn-sm btn-primary">&laquo; Previos</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handlenextclick} className="btn btn-sm btn-primary">Next &raquo;</button>
          </div>
        </div>

      </div>
    );
  }
}

export default News;
