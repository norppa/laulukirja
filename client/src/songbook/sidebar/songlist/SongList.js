import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './SongList.css'

class SongList extends React.Component {
    select = id => () => {
        this.props.dispatch({ type: 'SET_ACTIVE_ID', payload: id })
    }

    classes = song => (song._id === this.props.active._id ? 'songlink selected' : 'songlink')

    render() {
        return (
            <div className="SongList">
                {this.props.songs.map((song, i) => {
                    const id = song._id
                    return (
                        <Link to={`/songs/${id}`}>
                            <div key={id} className={this.classes(id)} onClick={this.select(id)}>
                                {song.title}
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs.songs,
        active: state.songs.active
    }
}

export default connect(mapStateToProps)(SongList)
