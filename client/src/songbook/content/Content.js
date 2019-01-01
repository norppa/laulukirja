import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SongBody from './songbody/SongBody'
import SongActions from './songactions/SongActions'
import SongInfo from './songinfo/SongInfo'
import AdminTools from './admintools/AdminTools'
import SongTools from './songtools/SongTools'

import { Redirect } from 'react-router-dom'
import './Content.css'

class Content extends React.Component {
    state = { redirect: false }
    songBody = React.createRef()

    options = { chords: '', transpose: { transpose: false } }

    componentDidMount = () => {
        if (this.props.showEdit) {
            this.options.chords = 'highlight'
        }
        console.log(this.options)
        this.songBody.current.setContent(this.props.song.body, this.options)
    }

    componentDidUpdate = prevProps => {
        if (this.props.showEdit !== prevProps.showEdit) {
            this.options.chords = this.props.showEdit ? 'highlight' : ''
            this.updateView(this.options)
        }
    }

    save = () => {
        if (this.props.addNew) {
            axios
                .post('/api/songs/', this.props.song, {
                    headers: { authorization: 'bearer ' + this.props.admin }
                })
                .then(result => {
                    console.log('result', result)
                    this.setState({ redirect: result.data._id })
                })
                .catch(error => console.log('error', error))
        } else {
            axios
                .put('/api/songs/' + this.props.song._id, this.props.song, {
                    headers: { authorization: 'bearer ' + this.props.admin }
                })
                .then(result => {
                    console.log('result', result)
                    this.props.dispatch({ type: 'PUT_SONG', payload: result.data })
                })
                .catch(error => console.log('error', error))
        }
    }

    updateViewOrSave = () => {
        if (this.props.readyToSave) {
            this.save()
        } else {
            this.updateView()
        }
    }

    updateView = () => {
        this.songBody.current.update(this.options)
        this.props.dispatch({ type: 'SET_READY_TO_SAVE', payload: true })
    }

    onChange = () => {
        this.props.dispatch({
            type: 'SET_ACTIVE_PROP',
            payload: {
                prop: 'body',
                value: this.songBody.current.getContent()
            }
        })
        this.props.dispatch({ type: 'SET_READY_TO_SAVE', payload: false })
    }

    setSongBody = body => {
        this.props.dispatch({
            type: 'SET_ACTIVE_PROP',
            payload: {
                prop: 'body',
                value: body
            }
        })
        this.props.dispatch({ type: 'SET_READY_TO_SAVE', payload: false })
        this.songBody.current.setContent(body, this.options)
    }

    render() {
        if (this.state.redirect) return <Redirect to={`/songs/${this.state.redirect}`} />

        return (
            <div className="Content roundedbox">
                <h2>{this.props.song.title}</h2>
                <SongActions updateView={this.updateView} />
                <SongInfo />
                <SongTools setSongBody={this.setSongBody} />
                <AdminTools updateViewOrSave={this.updateViewOrSave} onChange={this.onChange} />
                <SongBody ref={this.songBody} onChange={this.onChange} edit={this.props.showEdit} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.songs[state.songs.active],
        readyToSave: state.songs.readyToSave,
        addNew: state.songs.addNew,
        admin: state.login.admin,
        showEdit: state.view.showEdit
    }
}

export default connect(mapStateToProps)(Content)
