const express = require('express');
const cors = require("cors");
const app = express();

const songController = require("./controllers/songController");

//MIDDLEWARE- HITS A ROUTE. AFTER REQ BUT BEFORE THE ROUTE
app.use("/songs", songController)
//PARSES JSON FOR US SO WE CAN USE IT 
app.use(express.json());
app.use(cors());

app.use("/songs", songController);

app.get('/',(req,res)=> {
    res.send('welcome to Tuner Full Stack App')
})

//404
app.get("*",(req,res)=>{
 res.status(404).send('page not found')
})

module.exports = app;