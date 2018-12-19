import React from 'react'
import { connect } from 'react-redux'

class SongInfo extends React.Component {

    createDiv = (name, value, opt = {}) => {
        if (!value) return null
        const title = name ? <span style={{marginRight: '0.5em'}}>{name}:</span> : name
        const content = opt.link
            ? <a href={value}>{value}</a>
            : value
        return (
            <div style={opt.style}>
                {title} {content}
                <br />
            </div>
        )
    }

    render() {
        if (!this.props.show) {
            return ''
        }

        const { title, composer, lyricist, performer, recording, info } = this.props.song

        return (
            <div className="SongInfo">
                <div className="song-info-left">
                    {this.createDiv('Säveltäjä', composer)}
                    {this.createDiv('Sanoittaja', lyricist)}
                    {this.createDiv('Esittäjä', performer)}
                    {this.createDiv('Tallenne', recording, {link: true})}
                    {this.createDiv(null, info, {style: {marginTop: '0.5em'}})}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.songs[state.songs.selected],
        show: state.view.showInfo
    }
}
export default connect(mapStateToProps)(SongInfo)
