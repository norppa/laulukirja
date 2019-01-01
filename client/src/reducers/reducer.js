import { combineReducers } from 'redux'

const initialState = {
    songs: [],
    active: undefined,
    addNew: false,
    readyToSave: false
}

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SONGS':
            return { ...state, songs: action.payload }
        case 'SET_SONG':
            return {
                ...state,
                songs: state.songs.map((song, i) => {
                    if (i === state.active) {
                        return action.payload
                    }
                    return song
                })
            }
        case 'SET_ACTIVE':
            return { ...state, active: action.payload }
        case 'NEW_SONG':
            return {
                ...state,
                songs: state.songs.concat({ title: '', body: [] }),
                active: state.songs.length,
                addNew: true,
                readyToSave: false
            }
        case 'CANCEL_NEW_SONG':
            return { songs: state.songs.slice(0, state.songs.length - 1) }
        case 'SET_ACTIVE_PROP': {
            const songs = state.songs.map((song, i) => {
                if (i !== state.active) return song
                return { ...song, [action.payload.prop]: action.payload.value }
            })
            return { ...state, songs }
        }
        case 'SET_READY_TO_SAVE':
            return { ...state, readyToSave: action.payload }
        case 'PUT_SONG':
            let songs = [...state.songs]
            for (let i = 0; i < songs.length; i++) {
                if (songs[i]._id === action.payload._id) {
                    songs[i] = action.payload
                    return { ...state, songs }
                }
            }
            songs.push(action.payload)
            return { ...state, songs }
        case 'CHANGE_SONG': {
            let i = 0
            if (isNaN(action.payload)) {
                i = Math.floor(Math.random() * state.songs.length)
            } else {
                const l = state.songs.length
                i = state.active + action.payload
                i = i < 0 ? (i % l) + l : i % l
            }
            return { ...state, active: i }
        }
        case 'DELETE_ACTIVE':
            return { songs: state.songs.filter((song, i) => i !== state.active) }
        default:
            return state
    }
}

const viewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'OPEN_EDIT_VIEW':
            return { ...state, showEdit: true }
        case 'TOGGLE_VIEW_EDIT':
            return { ...state, showEdit: !state.showEdit }
        case 'TOGGLE_VIEW_INFO':
            return { ...state, showInfo: !state.showInfo }
        case 'TOGGLE_VIEW_TOOLS':
            return { ...state, showTools: !state.showTools }
        default:
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
    login: loginReducer,
    view: viewReducer
})
