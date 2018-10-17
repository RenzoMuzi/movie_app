import React from 'react'
import PropTypes from 'prop-types'

const MovieCard = ({ resultsForSubmit }) =>
  (
    resultsForSubmit.map(r => (
      <article className="card" key={r.imdbID}>
        <a href={r.Poster}>
          <picture className="thumbnail">
            <img src={r.Poster} alt={r.Title} />
          </picture>
        </a>
        <div className="card-content clearfix">
          <div className="review">
            <h2>{r.Title}</h2>
            <p>{r.Type}</p>
          </div>
          <div className="reviewer">
          </div>
        </div>
      </article>
    )
    )
  )

export default MovieCard;

MovieCard.prototype = {
  resultsForSubmit: PropTypes.array.isRequired
}