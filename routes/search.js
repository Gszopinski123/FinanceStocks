const express = require('express')
const router = express.Router()
const currentDate = new Date()
router.use(express.urlencoded({ extended: true })); 
router.get('/',async(req,res)=> {
    //console.log(req.query.search)//endDate startDate
    let inputField
    if (req.query.startDate && req.query.endDate) {
        inputField =[`${req.query.search}`.toUpperCase(),`${req.query.startDate}`,`${req.query.endDate}`]
    } else {
        inputField =[`${req.query.search}`.toUpperCase(),`2024-09-12`,`2024-09-13`]
    }
    let text
    let info
    if (req.query.search) {
        searchTicker= `${req.query.search}`.toUpperCase()
        console.log(inputField[1],inputField[2])
        var url =`https://api.polygon.io/v2/aggs/ticker/${inputField[0]}/range/1/day/${inputField[1]}/${inputField[2]}?adjusted=true&sort=desc&limit=50000&apiKey=8ukN3Z4dvAETRsn6s_UVpmYrce76oiOX`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            let dates = []
            let prices = []
            if (json.queryCount >= 1) {
                for (let i = 0; i != json.results.length; i++) {
                    dates.push([json.results[i]['t'],json.results[i]['o']])
                    dates.push([json.results[i]['t']+43200000,json.results[i]['c']])
                }
                console.log(dates)
                text = `There was ${json.queryCount} stock/bond with the ticker ${json.ticker}`
                info = `This stock opened at ${json.results[json.results.length-1]['o']} on ${inputField[1]} and closed at $${json.results[0]['o']} on ${inputField[2]} 
                there was a ${(((json.results[0]['c']-json.results[json.results.length-1]['o'])/json.results[json.results.length-1]['o'])*100).toFixed(3)}% change`
                const config = {
                    type: "line",
                    data : dates
                }
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