import React from "react";
import { connect } from "react-redux";
import { parseBody } from '../../../tools/Music'

class SongBody extends React.Component {
  render() {
    return (
      <div className="SongBody">
        <pre>{parseBody(this.props.song)}</pre>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    song: state.songs.songs[state.songs.selected]
  };
};
export default connect(mapStateToProps)(SongBody);
