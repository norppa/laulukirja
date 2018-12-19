import React from 'react'

import { isChordRow, transposeRow } from '../../../tools/Music'

import './SongBody.css'

class SongBody extends React.Component {
    contentEditable = React.createRef()

    update = () => {
        const rows = this.htmlToBodyArray()
        this.setContent(rows)
    }

    getContent = () => {
        return this.htmlToBodyArray()
    }

    setContent = rows => {
        const target = this.contentEditable.current

        target.innerHTML = ''

        const options = this.props.options ? this.props.options : {}
        if (options.transpose) {
            rows = rows.map(row => {
                if (row.type === 'chord') {
                    return {
                        type: 'chord',
                        value: transposeRow(row.value, options.transpose)
                    }
                }
                return row
            })
        }

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
            if (row.type === 'chord') {
                div.classList.add(options.chords)
            }
            div.appendChild(document.createTextNode(row.value))
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
