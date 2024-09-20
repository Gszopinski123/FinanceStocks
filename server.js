const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/',(req,res) => {
    console.log('here')
    //res.sendStatus(500).send('hi')//can chain status messages.
    res.render("index", {text: "world"})
})



app.listen(4000)//listen on port 4000
const userRouter = require("./routes/users")
const searchRouter = require("./routes/search")
app.use('/users',userRouter)

app.use('/search',searchRouter)

