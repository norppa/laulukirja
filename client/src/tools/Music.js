import { noteMap, transpose } from './constants'

export const isChordRow = row => {
    if (!row) return false
    const words = row.split(/\s/)

    // check that none of the words start with non-chord character
    for (let i=0; i < words.length; i++) {
        const notes = 'ABCDEFGH'
        if (!notes.includes(words[i].charAt(0))) {
            return false;
        }
    }

    return true
}

export const toString = (song, options = {}) => {
    if (!song) {
        return ''
    }

    let output = ''
    if (options.showTitle) {
        output = song.title + '\n\n'
    }

    let rows = song.body
    console.log(rows)
    if (options.hideChords) {
        console.log(123)
        rows = rows.filter(row => !row.cho)
    }

    output = rows
        .reduce((acc, cur) => {
            return acc + cur[Object.keys(cur)[0]] + '\n'
        }, output)
        .trimEnd()

    return output
}

export const interval = (from, to) => {
    if (from === to) return null
    const idx1 = noteMap[from]
    const idx2 = noteMap[to]
    if (idx1 === undefined || idx2 === undefined) return undefined
    let interval = idx2 - idx1
    if (interval < -5) {
        interval = interval + 12
    }
    if (interval > 6) {
        interval = interval - 12
    }

    if (interval === 0) {
        if (from === 'H' || to === 'H') {
            return null
        }
        if (from.includes('#') || to.includes('b')) {
            return -0
        } else {
            return +0
        }
    }
    return interval
}

const isNegative = semitones => {
    return 1 / semitones < 0
}

export const transposeNote = (note, semitones) => {
    if (semitones === null) return note
    let transposedIdx = noteMap[note] + semitones
    while (transposedIdx < 0) {
        transposedIdx = transposedIdx + 12
    }
    while (transposedIdx >= 12) {
        transposedIdx = transposedIdx - 12
    }
    const transposed = isNegative(semitones) ? transpose.down : transpose.up
    return transposed[transposedIdx]
}

export const transposeChord = (chord, semitones) => {
    const bassIdx = chord.indexOf('/') + 1
    if (bassIdx > 0 && chord.length > bassIdx) {
        chord =
            chord.substring(0, bassIdx) +
            transposeNote(chord.substring(bassIdx), semitones)
    }
    let baseLen = 0
    const accidental = chord.charAt(1)
    if (accidental === '#' || accidental === 'b') {
        baseLen = 2
    } else {
        baseLen = 1
    }
    const base = chord.substr(0, baseLen)
    return transposeNote(base, semitones) + chord.substring(baseLen)
}

const chordIndexes = row => {
    let output = []
    let previousWasWhitespace = true
    for (let i = 0; i < row.length; i++) {
        if (previousWasWhitespace) {
            if (/\S/.test(row.charAt(i))) {
                output = output.concat(i)
                previousWasWhitespace = false
            }
        } else {
            if (/\s/.test(row.charAt(i))) {
                output = output.concat(i)
                previousWasWhitespace = true
            }
        }
    }
    output = output.concat(row.length)
    return output
}

export const transposeRow = (row, semitones) => {
    let output = ''
    let isChord = false
    let overflow = 0
    let previousIndex = 0
    chordIndexes(row).forEach(i => {
        if (isChord) {
            const chord = row.substring(previousIndex, i)
            const transposed = transposeChord(chord, semitones)
            overflow = transposed.length - chord.length
            output = output + transposed
        } else {
            let spaceLen = i - previousIndex
            if (spaceLen < overflow) {
                spaceLen = 0
                overflow = overflow - spaceLen
            } else {
                spaceLen = spaceLen - overflow
            }
            output = output + ' '.repeat(spaceLen)
        }
        previousIndex = i
        isChord = !isChord
    })
    return output
}
