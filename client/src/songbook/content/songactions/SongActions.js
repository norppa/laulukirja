import React from "react";
import { connect } from "react-redux";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRandom,
  FaWrench,
  FaInfo,
  FaEdit
} from "react-icons/fa";

class SongActions extends React.Component {
  render() {
    return (
      <div className="SongActions">
        <FaArrowLeft
          size={42}
          onClick={() =>
            this.props.dispatch({ type: "CHANGE_SONG", payload: 1 })
          }
        />
        <FaRandom
          size={42}
          onClick={() =>
            this.props.dispatch({ type: "CHANGE_SONG", payload: "random" })
          }
        />
        <FaArrowRight
          size={42}
          onClick={() =>
            this.props.dispatch({ type: "CHANGE_SONG", payload: -1 })
          }
        />
        <FaWrench className="song-menu-right" size={42} onClick={null} />
        <FaInfo
          className="song-menu-right"
          size={42}
          onClick={() => this.props.dispatch({ type: "TOGGLE_VIEW" })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    songs: state.songs
  };
};

export default connect(mapStateToProps)(SongActions);
