const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config({path:'./.env'})
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true, useUnifiedTopology: true , usseCreateIndex : true})
.then(() => {
    console.log("DB CONNECTED")
})
.catch(err => console.log(err))

const app = express()

const Port =  process.env.Port ||  8000;

app.listen(Port,() => {
    console.log(`app is running ${Port}`)
})