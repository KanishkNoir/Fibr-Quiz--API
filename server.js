const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes').default
const cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(routes)

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
const db = mongoose.connection

db.on('error', (error)=> console.error('Database could not connect'))
db.once('open', ()=> console.log('Connected to Databse'))

app.listen(process.env.PORT, () =>{
    console.log("Fibr Quiz API is running!")
})