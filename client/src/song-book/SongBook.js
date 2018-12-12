import React from "react";
import axios from "axios";

const apiUrl = "/api/songs";

class SongBook extends React.Component {
  componentDidMount() {
    axios
      .get(apiUrl)
      .then(response => {
        console.log('response', response)
      })
      .catch(error => console.log("error fetching songs from db", error));
  }

  render() {
    return (
      <div className="SongBook">
        SongBook
      </div>
    );
  }
}

export default SongBook;
