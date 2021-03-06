import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
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
                    this.props.dispatch({ type: 'SET_ACTIVE', payload: i })
                    break
                }
            }
        }
    }

    toFrontPage = () => {
        this.props.dispatch({ type: 'SET_ACTIVE', payload: undefined })
    }

    render() {

        return (
            <div className="SongBook">
                <div className="Header">
                    <Link to="/" id="site-header-link">
                        <h1 onClick={this.toFrontPage}>Laulukirja</h1>
                    </Link>
                </div>

                <SideBar />
                {this.props.active !== undefined ? (
                    <Content key={`content-song-${this.props.active}`} />
                ) : (
                    <FrontPage />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        active: state.songs.active,
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(SongBook)
