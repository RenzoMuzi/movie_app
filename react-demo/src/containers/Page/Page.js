import React, { Component } from 'react'
import Search from '../../components/Search/Search'
import debounce from 'lodash/debounce'
import axios from 'axios'
import Aux from '../../hoc/Aux'
import Movies from '../../components/Movies/Movies'

class Page extends Component {
  state = {
    query: '',
    queryForId: '',
    results: [],
    resultsForSubmit: [],
  }

  componentDidMount = () => {
    axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&s=${process.env.FIRST_MOVIES_QUERY}`)
      .then(({ data }) => {
        this.setState({
          resultsForSubmit: data.Search
        })
      })
  }

  getInfo = () => {
    if (this.state.queryForId !== '') {
      axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&i=${this.state.queryForId}`)
        .then(({ data }) => {
          this.setState({
            resultsForSubmit: [data]
          })
        })
    } else {
      if (this.state.query !== '') {
        axios.get(`${process.env.API_URL}?apikey=${process.env.API_KEY}&s=${this.state.query}`)
          .then(({ data }) => {
            this.setState({
              results: data.Search
            })
          })
      }
    }
  }

  handleInputChange = (event) => {
    const debouncedGetInfo = debounce(this.getInfo, 500);
    
    this.setState({
      query: event.target.value
    },
      () => { debouncedGetInfo(); }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('holi');
    if ((this.state.results !== undefined) && (this.state.results.length > 0)) {
      const copyOfresults = this.state.results;
      this.setState({ resultsForSubmit: copyOfresults, results: [], queryForId: '' })
    }
  }

  handleFocus = (event) => {
    this.setState({ query: '', queryForId: '' });
  }

  handleBlur = (event) => {
    
  }

  handleClickSuggestion = (id, title) => {
    this.setState({
      query: title, queryForId: id, results: []
    },
      () => {
        this.getInfo();
      }
    );
  }

  render() {
    return (
      <Aux>
        <header className="mainHeader">
          <Search
            query={this.state.query}
            results={this.state.results}
            onSubmit={this.handleSubmit}
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onClick={this.handleClickSuggestion}
          />
        </header>
        
        <Movies
          resultsForSubmit={this.state.resultsForSubmit}
        />
      </Aux>
    )
  }
}

export default Page;
