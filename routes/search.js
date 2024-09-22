const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true })); 
router.get('/',(req,res)=> {
    console.log(req.query.search)
    if (req.query.search) {
        res.render("index", {text: "We Found Something!"})
    }
    res.render("search",{text:"This is the search page!",})
})

module.exports = router