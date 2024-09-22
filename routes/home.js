const express = require('express')
const router = express.Router()
const api_key = process.env.api_key


async function getData() {
    var url ="https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=8ukN3Z4dvAETRsn6s_UVpmYrce76oiOX"
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json)
      return json
    } catch (error) {
      console.error(error.message);
    }
    
  }

async function collectData() {
    const data = await getData()
    console.log(data)
    return data
}
router.get('/',async(req,res) =>{
    var data = await collectData()
    res.render("index",{text: JSON.stringify(data)})
})

module.exports = router