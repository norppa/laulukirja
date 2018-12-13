import React from "react";
import { connect } from "react-redux";
import SongBody from "./songbody/SongBody";
import SongActions from "./songactions/SongActions";
// import SongMenu from "./SongMenu";
// import SongInfo from "./SongInfo";
// import ViewTools from "./ViewTools";
// import AdminTools from "./admintools/AdminTools";
// import SongArea from "./songarea/SongArea";
// import { parse } from "../../logic/Music";
import "./Content.css";

class Content extends React.Component {
  render() {
    if (!this.props.song._id) {
      return (
        <div className="Content roundedbox">
          <h2>Etusivu</h2>
        </div>
      );
    }

    const viewInfo = this.props.view[this.props.song._id];

    return (
      <div className="Content roundedbox">
        <h2>{this.props.song.title}</h2>
        <SongActions />
        {this.props.view[this.props.song._id].info ? "info" : "no info"}
        <SongBody />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    song: state.songs.selected,
    view: state.songs.view
  };
};

export default connect(mapStateToProps)(Content);
