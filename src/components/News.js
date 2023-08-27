import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 8,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props){
      super(props);
      this.state = {
          articles : [],
          loading : false,
          page : 1          
      }
      document.title = `${this.capitalize(this.props.category)} - DailyNews`
  }
  
  updatePage = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fc34892a02f0434c84a4e268bdfd833d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();

    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading: false
    })
  }

  componentDidMount = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fc34892a02f0434c84a4e268bdfd833d&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles : parsedData.articles,
        totalResults : parsedData.totalResults,
        loading : false
      });
  }

  PrevHand = async () => {
    
    this.setState({ page : this.state.page - 1 })
    this.updatePage()
  }

  NextHand = async () => {
    this.setState({ page : this.state.page + 1 })
    this.updatePage()
  }

  render() {
    return (
      <div>
        <div className="container">
          <h2 className='text-center my-2'>DailyNews Top-Headlines from {this.capitalize(this.props.category)} category</h2>
          {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((ele) => {
            return <div className="col-md-4" key={ele.url}>
            <NewsItem title={ele.title?ele.title.slice(0,61):""} desc={ele.description?ele.description.slice(0,83):""} ImgUrl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/> 
            </div>
          })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevHand}>&larr; Previous</button>
          <button disabled={this.state.page + 1  > Math.ceil(this.state.totalResults/21)} type="button" className="btn btn-dark" onClick={this.NextHand}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
