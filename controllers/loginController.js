const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()


loginRouter.post('/', (request, response) => {
    const pwdHash = process.env.ADMIN_HASH
    console.log(request.body.password, pwdHash)

    return bcrypt.compare(request.body.password, pwdHash)
        .then(passwordCorrect => {
            if (passwordCorrect) {
                console.log('correct password')
                const token = jwt.sign({user: 'admin'}, process.env.SECRET)
                return response.status(200).send({token})
            } else {
                return response.status(401).send({error: 'incorrect password'})
            }
        })
        .catch(error => response.status(500).send({error: error.toString()}))
})

module.exports = loginRouter
