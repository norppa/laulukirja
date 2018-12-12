const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Song = require('../models/Song')

const authError = (request) => {
    const authorization = request.get('authorization')
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
    const input = request.body
    const song = new Song({
        name: input.name,
        lyrics: input.lyrics,
        recording: input.recording,
        chorded: input.chorded
    })
    Song.findOneAndUpdate({_id: request.params.id}, song, {new: true} )
    .then(updatedSong => {
        console.log(updatedSong)
        response.json(updatedSong)
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({error: 'malformatted id'})
    })
})

router.delete('/:id', (request, response) => {
    Song.remove({_id: request.params.id})
    .then(result => response.status(204).send())
})

module.exports = router
