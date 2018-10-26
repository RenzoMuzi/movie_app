import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'

import axios from '../../services/api/api'
import Suggestions from '../Search/Suggestions/Suggestions'
import * as actionTypes from '../../store/actions'

class Search extends Component {
  state = {
    query: '',
    queryForId: '',
    results: [],
    start: true,
  }

  componentDidMount = () => {
    this.movieSearch(process.env.FIRST_MOVIES_QUERY, null);
  }

  movieSearch = (titleMovie, idMovie) => {
    axios.get('', {
      params: {
        apikey: process.env.API_KEY,
        s: titleMovie,
        i: idMovie
      }
    })
      .then(({ data }) => {
        if (titleMovie) {
          this.state.start ?
            (
              this.props.searchResultsForSubmit(data.Search),
              this.setState({ start: false })
            )
            :
            this.setState({ results: data.Search });
        } else {
          this.props.searchResultsForSubmit([data]);
        }
      })
  }

  handleInputChange = (event) => {
    const word = event.target.value;
    this.setState({
      query: word
    },
      () => {
        if (word !== '') {
          const debouncedGetInfo = debounce(this.movieSearch, 300);
          debouncedGetInfo(word, null);
        }
      }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if ((this.state.results !== undefined) && (this.state.results.length > 0)) {
      const copyOfresults = this.state.results;
      this.props.searchResultsForSubmit(copyOfresults);
      this.setState({
        results: [],
        queryForId: ''
      })
    }
  }

  handleFocus = (event) => {
    this.setState({ query: '', queryForId: '' });
  }

  handleClickSuggestion = (id, title) => {
    this.setState({
      query: title,
      queryForId: id,
      results: []
    },
      () => {
        this.movieSearch(null, id)
      }
    );
  }

  render() {
    return (
      <div className="searchContainer">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            placeholder="Search for movies..."
            onChange={(e) => this.handleInputChange(e)}
            onFocus={this.handleFocus}
            value={this.query}
          />
        </form>
        {(((this.state.results !== undefined)
          && (this.state.query !== "")
          && (this.state.results.length > 0))
          && (<Suggestions
            results={this.state.results}
            onClick={this.handleClickSuggestion}
          />))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    resultsForSubmit: state.resultsForSubmit,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    searchResultsForSubmit: (resultFS) => dispatch({ type: actionTypes.HANDLE_RESULTS_FOR_SUBMIT, resultsForSubmit: resultFS }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

