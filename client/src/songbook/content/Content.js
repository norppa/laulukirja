import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import SongBody from './songbody/SongBody'
import SongActions from './songactions/SongActions'
import SongInfo from './songinfo/SongInfo'
import AdminTools from './admintools/AdminTools'
import './Content.css'

class Content extends React.Component {
    songBody = React.createRef()

    componentDidMount = () => {
        this.songBody.current.setContent(this.props.song.body)
    }

    save = () => {
        console.log('trying to save this', this.props.song)
        if (this.props.addNew) {
            axios
                .post('/api/songs/', this.props.song, {
                    headers: { authorization: 'bearer ' + this.props.admin }
                })
                .then(result => {
                    console.log('result', result)
                    this.props.dispatch({ type: 'PUT_SONG', payload: result.data })
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
            this.songBody.current.update()
            this.props.dispatch({ type: 'SET_READY_TO_SAVE', payload: true })
        }
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

    render() {
        const options = this.props.admin ? { chords: 'highlight' } : {}
        return (
            <div className="Content roundedbox">
                <h2>{this.props.song.title}</h2>
                <SongActions updateViewOrSave={this.updateViewOrSave} />
                <SongInfo />
                <AdminTools updateViewOrSave={this.updateViewOrSave} onChange={this.onChange} />
                <SongBody ref={this.songBody} onChange={this.onChange} edit={!!this.props.admin} options={options} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.active,
        readyToSave: state.songs.readyToSave,
        addNew: state.songs.addNew,
        view: state.view,
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(Content)
