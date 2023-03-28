const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.routes')
const cors = require('cors')


const morgan = require('morgan')
const app = express()

app.use(cors())


require('dotenv').config({path:'./config/.env'})
require("./config/db")



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))


//routes
app.use('/api/user',userRoutes);



//serveur
app.listen(process.env.PORT,()=>{
    console.log(`server running on port  http://localhost:${process.env.PORT}`)
})