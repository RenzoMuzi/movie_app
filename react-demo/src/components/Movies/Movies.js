import React from 'react'
import PropTypes from 'prop-types'
import MovieCard from './MovieCard/MovieCard'

const Movies = ({ resultsForSubmit }) =>
  (
    <div className="centered">
      <section className="cards">
        {((resultsForSubmit) && (resultsForSubmit.length > 0)) && <MovieCard resultsForSubmit={resultsForSubmit} />}
      </section>
    </div>
  )

export default Movies;

Movies.propTypes = {
  resultsForSubmit: PropTypes.array,
}