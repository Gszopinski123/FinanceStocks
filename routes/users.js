const express= require('express')
const router = express.Router()


router.get('/', (req,res)=> {
    res.render("index",{text : 1234})
})

router.get('/new', (req,res)=> {
    res.send("User new form", text | "World")
})

module.exports = router