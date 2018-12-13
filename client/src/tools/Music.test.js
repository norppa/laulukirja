const Music = require('./Music')

describe('transposeRow tests', () => {
    it('null transpose returns unchanged', () => {
        const row = 'C   F        G7    C'
        expect(Music.transposeRow(row, null)).toBe(row)
        expect(Music.transposeRow('', null)).toBe('')
    })

    it('transposes row', () => {
        const a = 'C   F        G7    C'
        const b = 'E   A        B7    E'
        const c = 'A   D        E7    A'
        expect(Music.transposeRow(a, 4)).toBe(b)
        expect(Music.transposeRow(a, -3)).toBe(c)
    })
})

describe('transposeChord tests', () => {
    it('null transpose returns unchanged', () => {
        expect(Music.transposeChord('Amaj7', null)).toBe('Amaj7')
        expect(Music.transposeChord('foobar', null)).toBe('foobar')
    })

    it('transposes major chords', () => {
        expect(Music.transposeChord('C', 2)).toBe('D')
        expect(Music.transposeChord('D#', 2)).toBe('F')
        expect(Music.transposeChord('Eb', 3)).toBe('F#')
        expect(Music.transposeChord('F#', -0)).toBe('Gb')
        expect(Music.transposeChord('Gb', -12)).toBe('Gb')
    })

    it('transposes random chords', () => {
        expect(Music.transposeChord('Dm', 2)).toBe('Em')
        expect(Music.transposeChord('D#m', 1)).toBe('Em')
        expect(Music.transposeChord('F#maj7', 4)).toBe('A#maj7')
        expect(Music.transposeChord('A#dim', -0)).toBe('Bbdim')
    })

    it('transposes alternate bass chords', () => {
        expect(Music.transposeChord('Dm/F', 7)).toBe('Am/C')
        expect(Music.transposeChord('Gsus/D', -11)).toBe('Absus/Eb')
    })
})

describe('interval tests', () => {
    it('returns something', () => {
        expect(Music.interval('A', 'B')).not.toBe(undefined)
    })

    it('returns null for same note', () => {
        expect(Music.interval('A', 'A')).toBe(null)
        expect(Music.interval('B', 'B')).toBe(null)
        expect(Music.interval('G', 'G')).toBe(null)
    })

    it('returns undefined if not acceptable input', () => {
        expect(Music.interval('A', null)).toBe(undefined)
        expect(Music.interval('S', 'A')).toBe(undefined)
    })

    it('B and H are equal', () => {
        expect(Music.interval('B', 'H')).toBe(null)
        expect(Music.interval('H', 'A')).toBe(-2)
        expect(Music.interval('G', 'H')).toBe(4)
    })

    it('returns value between -5 and +6', () => {
        expect(Music.interval('A', 'B')).toBe(2)
        expect(Music.interval('B', 'A')).toBe(-2)
        expect(Music.interval('C', 'G')).toBe(-5)
        expect(Music.interval('F', 'B')).toBe(6)
    })

    it('flat to sharp conversion returns +0', () => {
        expect(Music.interval('Bb', 'A#')).toBe(+0)
        expect(Music.interval('F', 'E#')).toBe(+0)
        expect(Music.interval('Cb', 'B')).toBe(+0)
    })

    it('sharp to flat conversion returns -0', () => {
        expect(Music.interval('A#', 'Bb')).toBe(-0)
        expect(Music.interval('E#', 'F')).toBe(-0)
        expect(Music.interval('B', 'Cb')).toBe(-0)
    })
})

describe('transposeNote tests', () => {
    it('null transpose returns unchanged', () => {
        expect(Music.transposeNote('C', null)).toBe('C')
        expect(Music.transposeNote('Cb', null)).toBe('Cb')
        expect(Music.transposeNote('E#', null)).toBe('E#')
    })

    it('invalid note returns undefined', () => {
        expect(Music.transposeNote('c', 2)).toBe(undefined)
        expect(Music.transposeNote('S', 2)).toBe(undefined)
        expect(Music.transposeNote(null, 2)).toBe(undefined)
    })

    it('transposes positive intervals', () => {
        expect(Music.transposeNote('C', 2)).toBe('D')
        expect(Music.transposeNote('G', 4)).toBe('B')
        expect(Music.transposeNote('D#', 2)).toBe('F')
    })

    it('transpose negative intervals', () => {
        expect(Music.transposeNote('A', -2)).toBe('G')
        expect(Music.transposeNote('F', -3)).toBe('D')
    })

    it('negative transpose produces flats', () => {
        expect(Music.transposeNote('A#', -1)).toBe('A')
        expect(Music.transposeNote('A#', -4)).toBe('Gb')
        expect(Music.transposeNote('C', -2)).toBe('Bb')
    })

    it('positive transpose produces sharps', () => {
        expect(Music.transposeNote('Db', 3)).toBe('E')
        expect(Music.transposeNote('Ab', 5)).toBe('C#')
        expect(Music.transposeNote('F', 5)).toBe('A#')
    })

    it('zero positive transpose produces sharps', () => {
        expect(Music.transposeNote('Db', +0)).toBe('C#')
        expect(Music.transposeNote('A#', +0)).toBe('A#')
        expect(Music.transposeNote('C', +0)).toBe('C')
    })

    it('zero negative transpose produces flats', () => {
        expect(Music.transposeNote('Db', -0)).toBe('Db')
        expect(Music.transposeNote('A#', -0)).toBe('Bb')
        expect(Music.transposeNote('C', -0)).toBe('C')
    })

    it('transpose large intervals', () => {
        expect(Music.transposeNote('A', 100)).toBe('C#')
        expect(Music.transposeNote('G', -100)).toBe('Eb')
    })
})
