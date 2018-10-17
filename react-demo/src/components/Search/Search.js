import React from 'react'
import PropTypes from 'prop-types'
import Suggestions from '../Search/Suggestions/Suggestions'

const Search = ({
  query,
  results,
  onClick,
  onSubmit,
  onChange,
  onFocus,
  onBlur
  }) => (
    <div className="searchContainer">
      <form onSubmit={onSubmit}>
        <input
          placeholder="Search for movies..."
          onChange={onChange}
          onFocus={onFocus}
          value={query}
          onBlur={onBlur}
        />
      </form>
      {(((results !== undefined) 
        && (query !== "")
        && (results.length > 0))
        && (<Suggestions
          results={results}
          onClick={onClick}
        />))}
    </div>
  )

export default Search;

Search.prototype = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}