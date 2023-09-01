import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => { 
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [articles,setarticles] = useState([]);
  const [loading,setLoading] = useState(true);
  const [page, setpage] = useState(2);
  const [totalResults, settotalResults] = useState(0);
  
  
  const updatePage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(50);
      setarticles(parsedData.articles);
      settotalResults(parsedData.totalResults);
      setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalize(props.category)} - DailyNews`
    updatePage();
    // eslint-disable-next-line
  },[]) 

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    let data = await fetch(url);
      let parsedData = await data.json();
      setarticles(articles.concat(parsedData.articles))
      settotalResults(parsedData.totalResults);
  };

    return (
      <>
          <h2 className='text-center my-2'>DailyNews Top-Headlines from {capitalize(props.category)} category</h2>
          {loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>} >  
          <div className="container">
            <div className="row">
                {articles.map((ele) => {
                  return <div className="col-md-4" key={ele.url}>
                  <NewsItem title={ele.title?ele.title.slice(0,61):""} desc={ele.description?ele.description.slice(0,83):""} ImgUrl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/> 
                  </div>
                })}
              </div>
          </div>
          </InfiniteScroll>
        
      </>
    )
}

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general'
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}

export default News;
