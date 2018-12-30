import React from 'react'
import SongList from './songlist/SongList'
import AddNew from './addnew/AddNew'
import './SideBar.css'

class SideBar extends React.Component {
    render() {
        return (
            <div className="SideBar roundedbox">
                <AddNew />
                <SongList />
            </div>
        )
    }
}

export default SideBar
