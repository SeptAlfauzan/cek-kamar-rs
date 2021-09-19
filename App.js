const express = require('express');
const app = express();
const port = 3000;

const Data = require('./Data.js');

app.get('/', (req, res)=>{
    Data.getHospitalsName().then(result => {
        console.log(result);
        res.send(result);
    }).catch(reject => console.log(reject));
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});