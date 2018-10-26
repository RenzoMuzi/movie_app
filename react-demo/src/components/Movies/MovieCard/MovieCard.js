import React from 'react'
import PropTypes from 'prop-types'
import { Fade, Stagger } from 'react-animation-components'

const MovieCard = ({ resultsForSubmit }) =>
  (
    <Stagger in className="cards"> 
      {resultsForSubmit.map(r => (
        <Fade key={r.imdbID}>
          <article className="card">
            <a href={r.Poster}>
              <picture className="thumbnail">
                <img src={(r.Poster !== "N/A") ? r.Poster : "src/assets/not-found.png"} alt={r.Title} />
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
        </Fade>
      )
      )}
    </Stagger>

  )

export default MovieCard;

MovieCard.propTypes = {
  resultsForSubmit: PropTypes.array,
}