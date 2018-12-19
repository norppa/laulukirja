import { combineReducers } from 'redux'

const initialState = {
    songs: [],
    active: { body: [] },
    addNew: false,
    readyToSave: false
}

const emptySong = { title: '', composer: '', lyricist: '', performer: '', recording: '', info: '', body: [] }

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SONGS':
            return { ...state, songs: action.payload }
        case 'SET_ACTIVE':
            return { ...state, active: action.payload }
        case 'SET_ACTIVE_ID':
            return { ...state, active: state.songs.find(song => song._id === action.payload) }
        case 'NEW_SONG':
            return { ...state, active: emptySong, addNew: true, readyToSave: false }
        case 'SET_ACTIVE_PROP':
            const active = {...state.active, [action.payload.prop]: action.payload.value}
            return { ...state, active}
        case 'SET_READY_TO_SAVE':
            return { ...state, readyToSave: action.payload}
        case 'PUT_SONG':
            let songs = [...state.songs ]
            for (let i=0; i< songs.length; i++) {
                if (songs[i]._id === action.payload._id) {
                    songs[i] = action.payload
                    return { ...state, songs }
                }
            }
            songs.push(action.payload)
            return {...state, songs}
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
        case 'SET_VIEW_TOOLS':
            return { ...state, viewTools: action.payload }
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
