const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Song = require('../models/Song')

const authError = request => {
    const authorization = request.get('authorization')
    console.log('auth', authorization)
    console.log(!authorization.toLowerCase())
    console.log(!authorization.toLowerCase().startsWith('bearer '))
    console.log(authorization.substring(0, 7))
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return { error: 'bearer token required' }
    }

    try {
        jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch (error) {
        return { error: error.toString() }
    }

    return null
}

router.get('/', (request, response) => {
    Song.find({}).then(songs => response.json(songs))
})

router.post('/', (request, response) => {
    console.log('post endpoint')
    const error = authError(request)
    if (error) return response.status(401).send(error)

    const input = request.body
    console.log(input)
    const song = new Song(input)
    song.save().then(result => response.json(song))
})

router.put('/:id', (request, response) => {
    Song.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
        .then(updatedSong => {
            console.log(updatedSong)
            response.json(updatedSong)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

router.delete('/:id', (request, response) => {
    Song.remove({ _id: request.params.id }).then(result => response.status(204).send())
})

const getSong = input => {
    const songFields = ['title', 'composer', 'lyricist', 'performer', 'recording', 'info', 'body']
    const songInput = songFields.reduce((acc, cur) => {
        if (input[cur]) {
            return { ...acc, [cur]: input[cur] }
        } else {
            return acc
        }
    }, {})
    songInput.foo = 0
    return songInput
}

module.exports = router
