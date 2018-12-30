import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import store from './store'
import SongBook from './songbook/SongBook'
import Login from './login/Login'
import './index.css'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SongBook} />
                <Route path="/songs/:id" component={SongBook} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
