const express = require('express');
const app = express();
const ejs = require('ejs');
const port = process.env.PORT || 3000;

const Data = require('./Data.js');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('home');
    // res.send('Welcome, for documentation check this <a href="https://github.com/SeptAlfauzan/cek-kamar-rs">link</a>');
});
app.get('/learn', (req, res)=>{
    res.render('tailwind');
    // res.send('Welcome, for documentation check this <a href="https://github.com/SeptAlfauzan/cek-kamar-rs">link</a>');
});

app.get('/provinsi', (req, res)=>{
   Data.getAllProvData().then(result => {
       console.log(result);
       res.setHeader('Content-Type', 'application/json');
       res.send(JSON.stringify(result));
   }).catch(reject => console.log(reject));
});
app.get('/kabupaten', (req, res)=>{
    const prov = req.query.prov;
    if (!prov) res.sendStatus(404);
    Data.getKabKotaData(prov).then(result => {
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    }).catch(reject => console.log(reject));
});

app.get('/rumahsakit', (req, res)=>{
    const prov = req.query.prov;
    const city = req.query.city;
    Data.getHospitalsName(prov, city).then(result => {
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    }).catch(reject => console.log(reject));
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});