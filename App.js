const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Data = require('./Data.js');

app.get('/', (req, res)=>{
    res.send('Welcome, for documentation check this <a href="https://github.com/SeptAlfauzan/cek-kamar-rs">link</a>');
});

app.get('/provinsi', (req, res)=>{
   Data.getAllProvData().then(result => {
       console.log(result);
       res.send(result);
   }).catch(reject => console.log(reject));
});
app.get('/kabupaten', (req, res)=>{
    const prov = req.query.prov;
    if (!prov) res.sendStatus(404);
    Data.getKabKotaData(prov).then(result => {
        console.log(result);
        res.send(result);
    }).catch(reject => console.log(reject));
});

app.get('/rumahsakit', (req, res)=>{
    const prov = req.query.prov;
    const city = req.query.city;
    Data.getHospitalsName(prov, city).then(result => {
        console.log(result);
        res.send(result);
    }).catch(reject => console.log(reject));
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});