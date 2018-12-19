import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger'
import reducer from './reducers/reducer'

const middleware = applyMiddleware(logger)

const store = createStore(reducer, middleware)

export default store
