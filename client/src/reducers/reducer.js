import { combineReducers } from 'redux'

const initialSongs = {
  songs: [],
  selected: ''
}

const songReducer = (state = initialSongs, action) => {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return {...state, songs: action.payload }
    case "SET_SELECTED":
      return {...state, selected: action.payload}
    default:
      return state;
  }
};

export default combineReducers({
  songs: songReducer
})
