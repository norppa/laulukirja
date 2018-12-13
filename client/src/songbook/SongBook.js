import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";
import "./SongBook.css";

const apiUrl = "/api/songs";

const mapStateToProps = state => {
  return {
    songs: state.songs.songs
  };
};

class SongBook extends React.Component {
  componentDidMount() {
    axios
      .get(apiUrl)
      .then(response => {
        const songs = response.data;
        songs.sort((a, b) => {
          if (a.name < b.name) return -1;
          else return 1;
        });
        this.props.dispatch({ type: "SET_ALL_SONGS", payload: songs });
      })
      .catch(error => console.log("error fetching songs from db", error));
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
    );
  }
}

export default connect(mapStateToProps)(SongBook);
