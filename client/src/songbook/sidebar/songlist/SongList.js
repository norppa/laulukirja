import React from "react";
import { connect } from "react-redux";
import "./SongList.css";

class SongList extends React.Component {
  select = i => () => {
    this.props.dispatch({ type: "SELECT_SONG", payload: i });
  };

  classes = i => (i === this.props.selected ? "songlink selected" : "songlink");

  render() {
    return (
      <div className="SongList">
        {this.props.songs.map((song, i) => (
          <div
            key={song._id}
            className={this.classes(i)}
            onClick={this.select(i)}
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
