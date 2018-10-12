import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from '../Suggestions/Suggestions'
import debounce from 'lodash/debounce'


class Search extends Component {
  state = {
    query: '',
    results: [],
  }

  getInfo = () => {
    axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&s=${this.state.query}`)
      .then(({ data }) => {
        this.setState({
          results: data.Search
        })
      })
  }

  handleInputChange = () => {
    const debouncedGetInfo = debounce(this.getInfo, 500);
    if (this.search.value.trim() !== "") {
      let queryCopy = this.query;

      queryCopy = this.search.value;

      this.setState({
        query: queryCopy
      },
        () => { debouncedGetInfo(); }  // HERE : implement lodash debounce
      );
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.search.value = '';
  }

  render() {
    let suggestionBox = null;
    if ((this.state.results !== undefined) && (this.state.results.length > 0)) {
      suggestionBox = (<Suggestions results={this.state.results} />);
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Search for movies..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
          />
        {/*<p>{this.state.query}</p>*/}
        </form>
        {suggestionBox}
      </div>
    )
  }
}

export default Search;
