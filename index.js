require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
require('./models')
const app = express()
const port = 8000
var userContrl = require('./controllers/userController')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).json({ data: 'shubham' });
})
app.get('/users', userContrl.getUsers)
app.get('/users/:id', userContrl.getUser)
app.post('/users', userContrl.postUser)
app.delete('/users/:id', userContrl.deleteUser)
app.patch('/users/:id', userContrl.patchUser)

app.get('/query', userContrl.queryUser)
app.get('/finders', userContrl.finderUser)
app.get('/getset', userContrl.getSetUser)

app.listen(port, () => {
  console.log(`API is listening on port ${port}`)
})