import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults: 0,
  //     ApiKey: "4ece752b5a9b4c728c205380220e2c0a"
  //   };
  // }


  const updateNews = async () => {
    setLoading(true);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.ApiKey}&category=${props.category}&country=${props.country}&pageSize=${props.pageSize}&page=${page}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    // this.setState({
    //   // articles: articles.concat(parsedData.articles),
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // });
    props.setProgress(100);
  }
  // async componentDidMount() {
  //   this.updateNews();
  // }

  useEffect(() => {
    document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.ApiKey}&category=${props.category}&country=${props.country}&pageSize=${props.pageSize}&page=${page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
    // this.setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   page: page + 1
    // });

  }
  return (
    <div className='my-3'>
      <h1 className='text-center' style={{ margin: "35px 0px" }}>NewsApp - Top Headlines in {capitalizeFirstLetter(props.category)}</h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4><Spinner /></h4>}
      >
        <div className='container'>
          <div className='row'>
            {loading && <Spinner />}
            {articles.map((element) => {
              return (
                <div className='col-md-6 col-lg-4' key={element.url}>
                  <NewsItem url={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className='container d-flex justify-content-between'>
          <button type="button" className="btn btn-primary" disabled={page<=1} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-primary" disabled={page===Math.ceil(totalResults/props.pageSize)}onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </div>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News