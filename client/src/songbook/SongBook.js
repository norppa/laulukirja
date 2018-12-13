import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import SideBar from './sidebar/SideBar'
import Content from './content/Content'
import './SongBook.css'

const apiUrl = '/api/songs'

class SongBook extends React.Component {
    componentDidMount() {

        axios
            .get(apiUrl)
            .then(response => {
                const songs = response.data
                songs.sort((a, b) => a.title.localeCompare(b.title))
                this.props.dispatch({ type: 'SET_ALL_SONGS', payload: songs })
                this.props.dispatch({ type: 'LOG_IN'})
            })
            .catch(error => console.log('error fetching songs from db', error))
    }

    render() {
        return (
            <div className="SongBook">
                <div className="Header">
                    <h1>Laulukirja</h1>
                </div>

                <SideBar />

                <Content />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(SongBook)
