const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events',  (req,res) =>{
    const event = req.body;

    axios.post('http://localhost:8000/events',event);
    axios.post('http://localhost:8001/events',event);
    axios.post('http://localhost:8002/events',event);

    res.send({status: 'OK'});
})

app.listen(8006, ()=>{
    console.log('listening on 8006')
})