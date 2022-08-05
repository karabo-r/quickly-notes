require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

app.use(express.json())

const notes = []
const users = []

// fetch all notes
// create a note
app.post('/api/notes', (request, response)=>{
    const {heading, content} = request.body

    const newNote = {
        heading,
        content
    }

    notes.push(newNote)
    response.status(201).json(newNote)
})
// update a note
// delete a note

// create a user
app.post('/api/users' ,async (request,response)=>{
    const {username, name, password} = request.body

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = {
        username,
        name,
        password: passwordHash
    }

    users.push(newUser)
    response.status(201).json(newUser)
})

// provide existing user with token
app.listen(3000, console.log('server is now live'))