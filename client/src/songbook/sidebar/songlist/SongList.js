import React from "react";
import { connect } from "react-redux";
import "./SongList.css";

class SongList extends React.Component {
  select = id => () => {
    const song = this.props.songs.find(song => song._id === id);
    this.props.dispatch({ type: "SELECT_SONG", payload: song });
  };

  classes = song =>
    song === this.props.selected ? "songlink selected" : "songlink";

  render() {
    return (
      <div className="SongList">
        {this.props.songs.map((song, i) => (
          <div
            key={song._id}
            className={this.classes(song._id)}
            onClick={this.select(song._id)}
          >
            {song.title}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs.songs,
    selected: state.songs.selected
  };
};

export default connect(mapStateToProps)(SongList);
