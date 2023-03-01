const express=require("express")
const app=express()
const port=4000
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  // Route to Homepage
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  app.get('/covid/:country', (req, res) => {
    // Insert Login Code Here
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '15bd12e63cmsh511349eb72b5d7dp11dfd4jsn03ff44a9f685',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
    let country = req.params.country;
    console.log(country,options)
    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`)
    .then(data => {
    return data.json();
    })
    .then(statistic => {
    console.log(statistic);
    res.send( JSON.stringify(statistic[0]) );
    });
    
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })