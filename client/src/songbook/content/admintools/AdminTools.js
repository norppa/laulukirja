import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './AdminTools.css'

class AdminTools extends React.Component {
    state = { delete: false }

    edit = prop => event => {
        const action = {
            type: 'SET_ACTIVE_PROP',
            payload: { prop, value: event.target.value }
        }
        this.props.dispatch(action)
    }

    cancel = () => {
        this.props.dispatch({ type: 'CANCEL_NEW_SONG' })
    }

    delete = () => {
        if (!this.state.delete) {
            this.setState({ delete: true })
            setTimeout(() => this.setState({ delete: false }), 5000)
            return
        }
        axios
            .delete('/api/songs/' + this.props.song._id, this.props.song, {
                headers: { authorization: 'bearer ' + this.props.admin }
            })
            .then(result => {
                this.props.dispatch({ type: 'DELETE_ACTIVE' })
            })
            .catch(error => console.log('error', error))
    }

    render() {
        if (!this.props.show) return null

        const { title, composer, lyricist, performer, recording, info } = this.props.song
        const buttonTitle = this.props.readyToSave ? 'Tallenna' : 'Tarkista soinnut'
        return (
            <div className="AdminTools">
                <div className="admin-tools-headers">
                    <div /> <button onClick={this.props.logout}>kirjaudu ulos</button>
                    <label>Kappaleen nimi</label>
                    <input type="text" value={title} onChange={this.edit('title')} />
                    <label>Säveltäjä</label>
                    <input type="text" value={composer} onChange={this.edit('composer')} />
                    <label>Sanoittaja</label>
                    <input type="text" value={lyricist} onChange={this.edit('lyricist')} />
                    <label>Esittäjä</label>
                    <input type="text" value={performer} onChange={this.edit('performer')} />
                    <label>Tallenne</label>
                    <input type="text" value={recording} onChange={this.edit('recording')} />
                    <label>Lisätietoja</label>
                    <input type="text" value={info} onChange={this.edit('info')} />
                    <div />
                    <div>
                        <button onClick={this.props.updateViewOrSave}>{buttonTitle}</button>
                        {this.props.addNew ? (
                            <Link to="/">
                                <button onClick={this.cancel}>peruuta</button>
                            </Link>
                        ) : (
                            <Link to="/">
                                <button onClick={this.delete} style={{ color: this.state.delete ? 'red' : 'black' }}>
                                    {this.state.delete ? 'varmista poisto' : 'poista'}
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.songs[state.songs.active],
        addNew: state.songs.addNew,
        readyToSave: state.songs.readyToSave,
        show: state.view.showEdit
    }
}

export default connect(mapStateToProps)(AdminTools)
