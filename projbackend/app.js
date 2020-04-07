const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config({path:'./.env'})
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors")


//ROUTES 
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")


//DB CONNECTIONS
mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true, useUnifiedTopology: true , usseCreateIndex : true})
.then(() => {
    console.log("DB CONNECTED")
})
.catch(err => console.log(err))

const app = express()


//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


const Port =  process.env.Port ||  8000;


//MY ROUTES

app.use("/api",authRoutes)
app.use("/api",userRoutes)





app.listen(Port,() => {
    console.log(`app is running ${Port}`)
})