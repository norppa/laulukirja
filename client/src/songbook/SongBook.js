import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import SideBar from './sidebar/SideBar'
import Content from './content/Content'
import FrontPage from './frontpage/FrontPage'
import './SongBook.css'

const apiUrl = '/api/songs'

class SongBook extends React.Component {
    async componentDidMount() {
        const response = await axios.get(apiUrl).catch(error => console.log('error fetching songs from db', error))

        const songs = response.data
        songs.sort((a, b) => a.title.localeCompare(b.title))
        this.props.dispatch({ type: 'LOG_IN' })
        this.props.dispatch({ type: 'SET_SONGS', payload: songs })

        if (this.props.match) {
            const songId = this.props.match.params.id
            for (let i = 0; i < songs.length; i++) {
                if (songs[i]._id === songId) {
                    this.props.dispatch({ type: 'SET_ACTIVE', payload: songs[i] })
                    break
                }
            }
        }
    }

    render() {
        const key = this.props.song._id ? this.props.song._id : 'content-new-song'
        return (
            <div className="SongBook">
                <div className="Header">
                    <h1>Laulukirja</h1>
                </div>

                <SideBar />
                <Content key={key} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.active,
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(SongBook)
