const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.get('/',(req,res) => {
    console.log('here')
    //res.sendStatus(500).send('hi')//can chain status messages.
    res.render("index", {text: "world"})
})



app.listen(3000)//listen on port 3000
const userRouter = require("./routes/users")

app.use('/users',userRouter)

