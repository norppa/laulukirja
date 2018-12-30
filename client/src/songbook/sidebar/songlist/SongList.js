import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './SongList.css'

class SongList extends React.Component {
    select = i => () => {
        this.props.dispatch({ type: 'SET_ACTIVE', payload: i })
    }

    render() {
        return (
            <div className="SongList">
                {this.props.songs.map((song, i) => {
                    const id = song._id
                    return (
                        <Link key={'SongLink' + id} to={`/songs/${id}`}>
                            <div
                                className={i === this.props.active ? 'songlink selected' : 'songlink'}
                                onClick={this.select(i)}
                            >
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
