import { combineReducers } from 'redux'

const initialSongs = {
    songs: [],
    selected: null,
    viewStates: []
}

const initialViewState = {
    showInfo: false
}

const songReducer = (state = initialSongs, action) => {
    switch (action.type) {
        case 'SET_ALL_SONGS':
            return {
                ...state,
                songs: action.payload,
                viewStates: action.payload.map(song => initialViewState)
            }
        case 'SELECT_SONG':
            return { ...state, selected: action.payload }
        case 'CHANGE_SONG': {
            let i = 0
            if (isNaN(action.payload)) {
                i = Math.floor(Math.random() * state.songs.length)
            } else {
                const l = state.songs.length
                i = state.selected + action.payload
                i = i < 0 ? (i % l) + l : i % l
            }
            return { ...state, selected: i }
        }
        case 'TOGGLE_VIEW': {
            const i = state.selected
            const oldViewState = state.viewStates[i]
            const newViewState = { ...oldViewState, [action.payload]: !oldViewState[action.payload] }

            return {
                ...state,
                viewStates: state.viewStates.map((viewState, j) => (j === i ? newViewState : viewState))
            }
        }
        default:
            console.log('Got a dispatch that doesnt match:', action.type)
            return state
    }
}

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { admin: window.localStorage.getItem('admin') }
        case 'LOG_OUT':
            window.localStorage.removeItem('admin')
            return {}
        default:
            return state
    }
}

export default combineReducers({
    songs: songReducer,
    login: loginReducer
})
