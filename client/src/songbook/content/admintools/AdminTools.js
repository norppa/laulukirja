import React from 'react'
import { connect } from 'react-redux'
import './AdminTools.css'

class AdminTools extends React.Component {

    edit = prop => event => {
        const action = {
            type: 'SET_ACTIVE_PROP',
            payload: { prop, value: event.target.value }
        }
        this.props.dispatch(action)
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
                        <button onClick={this.props.delete}>poista</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.active,
        readyToSave: state.songs.readyToSave,
        show: state.view.showEdit
    }
}

export default connect(mapStateToProps)(AdminTools)
