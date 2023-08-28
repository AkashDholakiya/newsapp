import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


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
          page : 2,
          totalResults : 0          
      }
      document.title = `${this.capitalize(this.props.category)} - DailyNews`
  }
  
  updatePage = async () => {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(50);

    this.setState({
      articles : parsedData.articles,
      totalResults : parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  componentDidMount = async () => {
      this.updatePage();
  }

  // PrevHand = async () => {
    
  //   this.setState({ page : this.state.page - 1 })
  //   this.updatePage()
  // }

  // NextHand = async () => {
  //   this.setState({ page : this.state.page + 1 })
  //   this.updatePage()
  // }
  fetchMoreData = async () => {
    this.setState({page : this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();

    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults
    })
  };

  render() {
    return (
      <>
          <h2 className='text-center my-2'>DailyNews Top-Headlines from {this.capitalize(this.props.category)} category</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>} >  
          <div className="container">
            <div className="row">
                {this.state.articles.map((ele) => {
                  return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title?ele.title.slice(0,61):""} desc={ele.description?ele.description.slice(0,83):""} ImgUrl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/> 
                  </div>
                })}
              </div>
          </div>
          </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.PrevHand}>&larr; Previous</button>
          <button disabled={this.state.page + 1  > Math.ceil(this.state.totalResults/21)} type="button" className="btn btn-dark" onClick={this.NextHand}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}
