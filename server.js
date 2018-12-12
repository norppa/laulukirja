const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const songsController = require('./controllers/songsController')
const loginController = require('./controllers/loginController')

require('dotenv').config()
const app = express();
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
.catch(error => {
  console.log(error)
})

app.use(express.static('client/build'))
app.use('/api/songs', songsController)
app.use('/api/login', loginController)

app.get('*', (req,res) => {
    res.sendFile('/client/build/index.html');
});

app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT))
