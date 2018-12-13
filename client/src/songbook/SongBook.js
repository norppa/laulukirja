import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import SideBar from './sidebar/SideBar'
import './SongBook.css'

const apiUrl = "/api/songs";

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    selected: state.songs.selected
  };
};

class SongBook extends React.Component {
  componentDidMount() {
    axios
      .get(apiUrl)
      .then(response => {
        console.log("response", response.data);
        const songs = response.data
        songs.sort((a, b) => {
          if (a.name < b.name) return -1
          else return 1
        })
        this.props.dispatch({type: 'SET_ALL_SONGS', payload: songs})
        this.props.dispatch({type: 'SET_SELECTED', payload: songs[0]})
      })
      .catch(error => console.log("error fetching songs from db", error));
  }

  render() {
    console.log(this.props)
    return (
      <div className="SongBook">
        <div className="Header">
          <h1>Laulukirja</h1>
        </div>

        <SideBar />

        <div className="Content">
        {this.props.selected.name}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SongBook);
