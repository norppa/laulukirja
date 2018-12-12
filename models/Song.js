const mongoose = require('mongoose')

const Song = mongoose.model('Song', {
    title: String,
    composer: String,
    lyricist: String,
    body: mongoose.Schema.Types.Mixed,
    chorded: Boolean,
    recording: String,
    info: String
})

module.exports = Song
