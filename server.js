const express = require('express')
require('dotenv').config({path:'./config/.env'})
require("./config/db/db")
const app = express()

app.listen(process.env.PORT,()=>{
    console.log(`server running on port  ${process.env.PORT}`)
})