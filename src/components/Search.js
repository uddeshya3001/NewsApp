import React, { useState } from 'react'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import noResults from './noResult.svg'

const Search = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [query, setQuery] = useState("")

  document.title = 'NewsApp';

  const updateSearch = async () => {
    setLoading(true);
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.ApiKey}&country=${props.country}&pageSize=${props.pageSize}&page=${1}&q=${query}`;
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setNotFound(parsedData.totalResults===0)
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);

    props.setProgress(100);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    updateSearch();
    setPage(1);
  }

  const handleChange = (e) =>{
    e.preventDefault();
    setQuery(e.target.value);
  }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.ApiKey}&country=${props.country}&pageSize=${props.pageSize}&page=${page + 1}&q=${query}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
  }
  return (
    <div className='my-3'>
      <div className="container" style={{minWidth:"200px", maxWidth:"400px"}}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="search news..." aria-label="Search"  onChange={handleChange}/>
        <button className="btn btn-outline-success" disabled={query===""} type="submit">Search</button>
      </form>
      </div>
      {notFound && 
        <div className='d-flex' style={{justifyContent:"center", marginTop:"50px"}}><img src={noResults} alt="no results found"/>
        </div>
      }
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

    </div>
  )
}

Search.defaultProps = {
  pageSize: 6,
  country:"in"
}
Search.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string
}

export default Search
