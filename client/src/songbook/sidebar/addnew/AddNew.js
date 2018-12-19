import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './AddNew.css'

class AddNew extends React.Component {

    addNewSong = () => {
        this.props.dispatch({type: 'NEW_SONG'})
        this.props.dispatch({type: 'OPEN_EDIT_VIEW'})
    }

    render() {
        if (!this.props.admin) return null

        return (
            <div className="AddNew">
                <Link to={`/new`}>
                    <div onClick={this.addNewSong}>
                        Lisää uusi kappale
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        admin: state.login.admin
    }
}

export default connect(mapStateToProps)(AddNew)
