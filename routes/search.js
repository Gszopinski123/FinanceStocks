const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true })); 
router.get('/',async(req,res)=> {
    console.log(req.query.search)
    let text
    let info
    if (req.query.search) {
        searchTicker= `${req.query.search}`.toUpperCase()
        var url =`https://api.polygon.io/v2/aggs/ticker/${searchTicker}/range/1/day/2024-06-23/2024-09-23?adjusted=true&sort=desc&limit=50000&apiKey=8ukN3Z4dvAETRsn6s_UVpmYrce76oiOX`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json)
            if (json.queryCount >= 1) {
                text = `There was ${json.queryCount} stock/bond with the ticker ${json.ticker}`
                info = `This stock opened at ${json.results[0].o} and closed at ${json.results[0].c} the last day the market was open.`
            } else {
                text = `There were no Stock/bond with the ticker ${json.ticker}`
            }
        } catch (error) {
            console.log(error)
        }
        res.render("index", {text: text,info: info})
    } else {
        res.render("search",{text:"This is the search page!",})
    }
    
})

module.exports = router