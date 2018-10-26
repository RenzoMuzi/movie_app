import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Aux from '../../hoc/Aux'
import Search from '../../containers/Search/Search'
import Movies from '../../components/Movies/Movies'

const Page = ({resultsForSubmit}) => (
  <Aux>
    <header className="mainHeader">
      <Search />
    </header>
    <Movies
      resultsForSubmit={resultsForSubmit}
    />
  </Aux>
)

const mapStateToProps = state => {
  return {
    resultsForSubmit: state.resultsForSubmit,
  };
}

export default connect(mapStateToProps)(Page);

Page.propTypes = {
  resultsForSubmit: PropTypes.array,
}