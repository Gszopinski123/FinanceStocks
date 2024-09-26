const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true })); 
router.get('/',async(req,res)=> {
    //console.log(req.query.search)//endDate startDate
    let inputField =[`${req.query.search}`.toUpperCase(),`${req.query.startDate}`,`${req.query.endDate}`]
    let text
    let info
    if (req.query.search) {
        searchTicker= `${req.query.search}`.toUpperCase()
        console.log(inputField[1],inputField[2])
        var url =`https://api.polygon.io/v2/aggs/ticker/${inputField[0].toUpperCase()}/range/1/day/${inputField[1]}/${inputField[2]}?adjusted=true&sort=desc&limit=50000&apiKey=8ukN3Z4dvAETRsn6s_UVpmYrce76oiOX`
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
            res.render("index", {text: text,info: info})
        } catch (error) {
            console.log(error)
            res.render("search",{text:"The Search Failed! Try again.",})
        } 
    } else {
        res.render("search",{text:"This is the search page!",})
    }
    
})

module.exports = router