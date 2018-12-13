import React from "react";
import { connect } from "react-redux";

class SongInfo extends React.Component {
  render() {
    if (!this.props.show) {
      return ''
    }
    
    const {
      title,
      composer,
      lyricist,
      performer,
      recording,
      info
    } = this.props.song;

    return (
      <div className="SongInfo">
        <div className="song-info-left">
          {composer ? (
            <div>
              Säveltäjä:&nbsp; {composer}
              <br />
            </div>
          ) : null}
          {lyricist ? (
            <div>
              Sanoittaja:&nbsp; {lyricist}
              <br />
            </div>
          ) : null}
          {performer ? (
            <div>
              Esittäjä:&nbsp; {performer}
              <br />
            </div>
          ) : null}
          {recording ? (
            <div>
              Tallenne:&nbsp; <a href={recording}>{recording}</a>
              <br />
            </div>
          ) : null}
          {info ? <div>{info}</div> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    song: state.songs.songs[state.songs.selected]
  };
};
export default connect(mapStateToProps)(SongInfo);
