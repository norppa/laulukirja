import React from 'react'

import { isChordRow } from '../../../tools/Music'

import './SongBody.css'

class SongBody extends React.Component {
    contentEditable = React.createRef()

    componentDidUpdate(prevProps) {
        if (this.props.options !== prevProps.options) {
            this.setContent(this.htmlToBodyArray())
        }
    }

    update = (options) => {
        const rows = this.htmlToBodyArray()
        this.setContent(rows, options)
    }

    getContent = () => {
        return this.htmlToBodyArray()
    }

    setContent = (rows, options) => {
        const target = this.contentEditable.current

        target.innerHTML = ''

        if (options.wrap) {
            //figure out row width in chars
            const div = document.createElement('div')
            div.appendChild(document.createTextNode('x'.repeat(1000)))
            target.appendChild(div)
            const maxWidth = Math.floor(
                (target.clientWidth / div.scrollWidth) * 1000
            )
            target.innerHTML = ''

            //split as needed
            let newRows = []
            for (let i = 0; i < rows.length; i++) {
                const thisRow = rows[i]
                const nextRow = rows[i + 1] ? rows[i + 1] : {}
                if (thisRow.type === 'chord' && nextRow.type === 'lyric') {
                    // handle as a pair
                    newRows = newRows.concat(thisRow)
                    newRows = newRows.concat(nextRow)
                    i++
                    continue
                } else {
                    // singular row
                    do {
                        newRows = newRows.concat({
                            type: thisRow.type,
                            value: thisRow.value.substring(0, maxWidth)
                        })
                        thisRow.value = thisRow.value.substring(maxWidth)
                    } while (thisRow.value.length > 0)
                }
            }
            rows = newRows
        }

        rows.forEach(row => {
            const div = document.createElement('div')
            div.classList.add(row.type + '-row')
            if (options.chords && row.type === 'chord') {
                div.classList.add(options.chords)
            }
            if (row.value !== '') {
                div.appendChild(document.createTextNode(row.value))
            } else {
                div.appendChild(document.createElement('br'))
            }
            target.appendChild(div)
        })
    }

    onPaste = event => {
        event.preventDefault()
        const data = event.clipboardData.getData('text/plain')
        this.contentEditable.current.innerHTML = data
    }

    htmlToBodyArray = () => {
        const rows = this.contentEditable.current.innerHTML
            .replace(/&nbsp;/g, ' ')
            .replace(/<\/div>|<br>/g, '')
            .split(/<div.*?>|\n/)
            .map(row => {
                return { type: isChordRow(row) ? 'chord' : 'lyric', value: row }
            })
        if (rows[0].value === '') rows.shift()
        return rows
    }

    render() {

        return (
            <div
                className="SongBody"
                contentEditable={this.props.edit}
                suppressContentEditableWarning
                ref={this.contentEditable}
                onPaste={this.onPaste}
                onInput={this.props.onChange}>
                some stuff here
            </div>
        )
    }
}

export default SongBody
