const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true })); 
router.get('/',async(req,res)=> {
    console.log(req.query.search)
    let text
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
            if (json.queryCount >= 1) {
                text = `There was ${json.queryCount} stock/bond with the ticker ${req.query.search}`
            } else {
                text = `There were no Stock/bond with the ticker ${req.query.search}`
            }
        } catch (error) {
            console.log(error)
        }
        res.render("index", {text: text})
    } else {
        res.render("search",{text:"This is the search page!",})
    }
    
})

module.exports = router