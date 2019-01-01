import React from 'react'
import { connect } from 'react-redux'

class SongInfo extends React.Component {

    empty = true

    createDiv = (name, value, opt = {}) => {
        if (!value) return null
        const title = name ? <span style={{marginRight: '0.5em'}}>{name}:</span> : name
        const content = opt.link
            ? <a href={value}>{value}</a>
            : value
        this.empty = false
        return (
            <div style={opt.style}>
                {title} {content}
                <br />
            </div>
        )
    }

    render() {
        if (!this.props.show) return null

        const { composer, lyricist, performer, recording, info } = this.props.song

        return (
            <div className="SongInfo">
                <div className="song-info-left">
                    {this.createDiv('Säveltäjä', composer)}
                    {this.createDiv('Sanoittaja', lyricist)}
                    {this.createDiv('Esittäjä', performer)}
                    {this.createDiv('Tallenne', recording, {link: true})}
                    {this.createDiv(null, info, {style: {marginTop: '0.5em'}})}
                    {this.empty ? 'Kappaleeseen ei ole tallennettu tietoja' : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.songs[state.songs.active],
        show: state.view.showInfo
    }
}
export default connect(mapStateToProps)(SongInfo)
