import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loader from './Loader';


export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5f67567f06194be98a252c8d00396307&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults, 
      loading: false 
    });
  }

  handlePreviousPage = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5f67567f06194be98a252c8d00396307&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      page: this.state.page - 1, 
      loading: false 
    });

  }
  handleNextPage = async () => {
    console.log("Next");

    if (!(this.props.state + 1 > Math.ceil(this.state.totalResults / this.state.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=5f67567f06194be98a252c8d00396307&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ 
        articles: parsedData.articles, 
        page: this.state.page + 1,
        loading: false
      });
    }

  }

  render() {
    return (
      <div className='container'>
        <h1>Today's Top Headlines :	&rarr;</h1>
        {this.state.loading && <Loader></Loader>}
        <div className="row">
          {! this.state.loading && this.state.articles.map(
            (element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title.slice(0, 55) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            }
          )}
        </div>

        <div className='d-flex justify-content-between my-3'>
          <button type="button" disabled={this.props.state + 1 > Math.ceil(this.state.totalResults / 20)} className="btn btn-outline-dark" onClick={this.handlePreviousPage}>Previous &larr;</button>
          <button type="button" className="btn btn-outline-dark" onClick={this.handleNextPage}>Next &rarr;</button>
        </div>

      </div>
    )
  }
}