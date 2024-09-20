const express = require('express')
const router = express.Router()


router.get('/',(req,res)=> {
    res.render("index",{text:"This is the search page!"})
})

module.exports = router