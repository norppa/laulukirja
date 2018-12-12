import { combineReducers } from 'redux'

const aReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  aReducer
})
