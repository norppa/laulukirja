import React from "react";
import { connect } from "react-redux";
import SongBody from "./songbody/SongBody";
import SongActions from "./songactions/SongActions";
// import SongMenu from "./SongMenu";
import SongInfo from "./songinfo/SongInfo";
// import ViewTools from "./ViewTools";
// import AdminTools from "./admintools/AdminTools";
// import SongArea from "./songarea/SongArea";
// import { parse } from "../../logic/Music";
import "./Content.css";

class Content extends React.Component {
  render() {
    if (this.props.selected === null) {
      return (
        <div className="Content roundedbox">
          <h2>Etusivu</h2>
        </div>
      );
    }

    return (
      <div className="Content roundedbox">
        <h2>{this.props.song.title}</h2>
        <SongActions />
        <SongInfo show={this.props.viewState.showInfo}/>
        <SongBody />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    song: state.songs.songs[state.songs.selected],
    songs: state.songs.songs,
    selected: state.songs.selected,
    viewState: state.songs.viewStates[state.songs.selected]
  };
};

export default connect(mapStateToProps)(Content);
