import React from 'react'
import PropTypes from 'prop-types'

const Suggestions = ({ results, onClick }) =>
  (
    <ul className="ulSuggestion">
      {results.map(r => (
        <li className="liSuggestion" key={r.imdbID} onClick={() => onClick(r.imdbID, r.Title)}>
          {r.Title}
        </li>
      ))}
    </ul>
  )

export default Suggestions;

Suggestions.propTypes = {
  results: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}