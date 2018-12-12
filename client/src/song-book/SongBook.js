import React from "react";
import { connect } from "react-redux";
import axios from "axios";

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
        this.props.dispatch({type: 'SET_ALL_SONGS', payload: response.data})
      })
      .catch(error => console.log("error fetching songs from db", error));
  }

  render() {
    console.log(this.props)
    return (
      <div className="SongBook">
        {this.props.songs.map(song => (
          <div>{song.name}</div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(SongBook);
