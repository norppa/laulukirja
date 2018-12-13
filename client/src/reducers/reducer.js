import { combineReducers } from 'redux'

const initialSongs = {
  songs: [],
  selected: ''
}

const songReducer = (state = initialSongs, action) => {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return {...state, songs: action.payload }
    case "SELECT_SONG":
      return {...state, selected: action.payload}
    default:
      console.log('Got a dispatch that doesnt match')
      return state;
  }
};

export default combineReducers({
  songs: songReducer
})
