require('dotenv').config()
const express = require('express');
const session = require('express-session')
const mongoStore = require('connect-mongo')
require("./config/dbconnect")
const app = express()
const userRoute = require("./routes/users/users")
const postRoute = require("./routes/posts/posts")
const commentRoute = require("./routes/comments/comments");
const globalerrHandler = require('./middlewares/globalHandles');
const MongoStore = require('connect-mongo');


//Middlewares
//Configure Ejs
app.set("view engine",'ejs')
//Serve static file
app.use(express.static(__dirname, +"/public" ))

app.use(express.json())//Pass incoming Data
app.use(express.urlencoded({extended:true}))// Pass form data

//Session Configuration
app.use(session({
  secret: process.env.SESSION_KEY,
  resave:false,
  saveUninitialized:true,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URL,
    ttl:24*60*60, // 1 day
  })
}))

//Render Home Page
app.get('/',(req,res)=>{
   res.render('index')
})

//User route

app.use('/api/v1/users',userRoute)

//Post route

app.use('/api/v1/posts',postRoute)

//Comment route

app.use('/api/v1/comments',commentRoute)

//Error Handler middlewares
app.use(globalerrHandler)


//Listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`))