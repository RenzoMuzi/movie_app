import React from 'react'
import css from './Suggestions.css'

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li className={css.lisuggestion} key={r.imdbID}>
      {r.Title}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions