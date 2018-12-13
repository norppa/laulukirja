import { combineReducers } from "redux";

const initialSongs = {
  songs: [],
  selected: null,
  view: {}
};

const songReducer = (state = initialSongs, action) => {
  switch (action.type) {
    case "SET_ALL_SONGS":
      return { ...state, songs: action.payload, view: action.payload.reduce((acc, cur) => ({...acc, [cur._id]: {}}), {})};
    case "SELECT_SONG":
      console.log('selecting', { ...state, selected: action.payload })
      return { ...state, selected: action.payload };
    case "CHANGE_SONG": {
      let i = 0;
      if (isNaN(action.payload)) {
        i = Math.floor(Math.random() * state.songs.length);
      } else {
        const l = state.songs.length;
        i = state.selected + action.payload;
        i = i < 0 ? (i % l) + l : i % l;
      }
      return { ...state, selected: i };
    }
    case "TOGGLE_VIEW": {
      const id = state.selected._id;
      const oldSongView = state.view[id] ? state.view[id] : {}
      const newSongView = { ...oldSongView, info: !oldSongView.info };
      return {
        ...state,
        view: { ...state.view, [id]: newSongView }
      };
    }
    default:
      console.log("Got a dispatch that doesnt match:", action.type);
      return state;
  }
};

export default combineReducers({
  songs: songReducer
});
