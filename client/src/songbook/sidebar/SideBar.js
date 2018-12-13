import React from 'react'
import SongList from './songlist/SongList'
import './SideBar.css'

class SideBar extends React.Component {

    render() {
      return (
        <div className="SideBar roundedbox">
          <SongList />
        </div>
      )
    }
}


export default SideBar
