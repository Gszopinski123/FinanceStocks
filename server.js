const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/',(req,res) => {
    console.log('here')
    //res.sendStatus(500).send('hi')//can chain status messages.
    res.render("index", {text1232: "world"})
})



app.listen(4000)//listen on port 4000
//routes
const userRouter = require("./routes/users")
const searchRouter = require("./routes/search")
const homeRouter = require("./routes/home")
app.use('/home',homeRouter)
app.use('/users',userRouter)
app.use('/search',searchRouter)

