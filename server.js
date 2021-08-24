const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { getApi, addFlower, updateFlower, deleteFlower,getFav } = require('./controller/flower.controller')
require('dotenv').config()
var app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URL_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.status(200).json('Welcome')
})

app.get('/getFlowers', getApi)

app.get('/getFav/:email', getFav)


app.post('/add', addFlower)


app.put('/update', updateFlower)


app.delete('/delete/:email/:slug', deleteFlower)


app.get('*', (req, res) => {
    res.status(200).json('Page not found')
})

app.listen(process.env.PORT || 8081, () => {
    console.log(`connect with ${process.env.PORT}`);
})
