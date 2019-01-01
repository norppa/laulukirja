import React from 'react'
import { connect } from 'react-redux'
import { getInterval, transposeNote, transposeBody } from '../../../tools/Music.js'
import { FaLongArrowAltRight } from 'react-icons/fa'

import './SongTools.css'

class SongTools extends React.Component {
    state = {
        semitones: '0',
        direction: 'up',
        from: '',
        to: ''
    }

    componentDidMount = () => {
        this.setState({ from: this.guessKey(this.props.song.body) })
    }

    guessKey = (body) => {
        for (let i = body.length - 1; i >= 0; i--) {
            if (body[i].type === 'chord') {
                const chords = body[i].value.split(/\s+/)
                const lastChord = chords[chords.length - 1]
                if (lastChord.charAt(1) === '#' || lastChord.charAt(1) === 'b') {
                    return lastChord.substring(0, 2)
                } else {
                    return lastChord.substring(0, 1)
                }
            }
        }
    }

    changeSemitones = event => {
        const value = Number(event.target.value)
        const newState = { semitones: value }

        if (this.state.from) {
            const semitones = this.state.direction === 'up' ? value : -value
            newState.to = transposeNote(this.state.from, semitones)
        }
        this.setState(newState)
    }

    changeDirection = event => {
        const newState = { direction: event.target.value }

        if (this.state.from) {
            const semitones = event.target.value === 'up' ? this.state.semitones : -this.state.semitones
            newState.to = transposeNote(this.state.from, semitones)
        }
        this.setState(newState)
    }

    changeFrom = event => {
        if (event.target.value === '') {
            this.setState({ from: '' })
            return
        }
        const newState = { from: event.target.value }

        if (this.state.to) {
            const interval = getInterval(event.target.value, this.state.to)
            if (1 / interval > 0) {
                newState.direction = 'up'
                newState.semitones = interval
            } else {
                newState.direction = 'down'
                newState.semitones = -interval
            }
        }
        this.setState(newState)
    }

    changeTo = event => {
        if (event.target.value === '') {
            this.setState({ to: '' })
            return
        }

        const newState = { to: event.target.value }

        if (this.state.from) {
            const interval = getInterval(this.state.from, event.target.value)
            if (1 / interval > 0) {
                newState.direction = 'up'
                newState.semitones = interval
            } else {
                newState.direction = 'down'
                newState.semitones = -interval
            }
        }
        this.setState(newState)
    }

    transpose = () => {
        const semitones = this.state.direction === 'up' ? this.state.semitones : -this.state.semitones
        const body = transposeBody(this.props.song.body, semitones)
        this.setState({ from: this.guessKey(body), to: '' })
        this.props.setSongBody(body)
    }

    render() {
        if (!this.props.show) return null

        return (
            <div className="SongTools">
                Transponoi
                <select value={this.state.direction} onChange={this.changeDirection}>
                    <option value="up">ylös</option>
                    <option value="down">alas</option>
                </select>
                <select value={this.state.semitones} onChange={this.changeSemitones}>
                    {Array.from(new Array(12), (x, i) => i).map(i => (
                        <option key={`semitones-${i}`} value={i}>
                            {i}
                        </option>
                    ))}
                </select>
                puolisävelaskelta
                <input type="text" value={this.state.from} onChange={this.changeFrom} />
                <FaLongArrowAltRight style={{ verticalAlign: '-0.3em' }} />
                <input type="text" value={this.state.to} onChange={this.changeTo} />
                <br />
                <button onClick={this.transpose}>Transponoi</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        song: state.songs.songs[state.songs.active],
        show: state.view.showTools
    }
}
export default connect(mapStateToProps)(SongTools)
