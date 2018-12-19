import React from 'react'
import { connect } from 'react-redux'
import { FaArrowLeft, FaArrowRight, FaRandom, FaWrench, FaInfo, FaEdit } from 'react-icons/fa'

class SongActions extends React.Component {
    toggleEditView = () => {
        this.props.dispatch({ type: 'TOGGLE_VIEW_EDIT'})
        this.props.updateViewOrSave()
    }

    render() {
        return (
            <div className="SongActions">
                <FaArrowLeft size={42} onClick={() => this.props.dispatch({ type: 'CHANGE_SONG', payload: -1 })} />
                <FaRandom size={42} onClick={() => this.props.dispatch({ type: 'CHANGE_SONG', payload: 'random' })} />
                <FaArrowRight size={42} onClick={() => this.props.dispatch({ type: 'CHANGE_SONG', payload: 1 })} />
                <FaWrench className="song-menu-right" size={42} onClick={null} />
                <FaInfo
                    className="song-menu-right"
                    size={42}
                    onClick={() => this.props.dispatch({ type: 'TOGGLE_VIEW_INFO'})}
                />
                {this.props.admin ? (
                    <FaEdit className="song-menu-right" size={42} onClick={this.toggleEditView} />
                ) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.login,
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(SongActions)
