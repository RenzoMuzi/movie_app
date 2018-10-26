import * as actionTypes from './actions';

const initialState = {
  resultsForSubmit: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_RESULTS_FOR_SUBMIT:
      return {
        ...state,
        resultsForSubmit: action.resultsForSubmit
      };
    default:
      return state;
  }
}

export default reducer;