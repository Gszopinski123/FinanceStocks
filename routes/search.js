const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true })); 
router.get('/',async(req,res)=> {
    console.log(req.query.search)
    if (req.query.search) {
        searchTicker= `${req.query.search}`
        var url =`https://api.polygon.io/v2/aggs/ticker/${req.query.search}/range/1/day/2023-01-09/2023-01-09?apiKey=8ukN3Z4dvAETRsn6s_UVpmYrce76oiOX`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)
        }
        res.render("index", {text: "We Found Something!"})
    } else {
        res.render("search",{text:"This is the search page!",})
    }
    
})

module.exports = router