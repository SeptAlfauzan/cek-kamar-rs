const puppeteer = require('puppeteer');//change to puppeteer-core when developing on  local machine
const fs = require('fs');


const launchOptions = {
    // uncomment this, when u want to develop on local machine
    // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    // args: ['--start-maximized'],
    headless: true
};

const createPropData = async () => {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.goto('https://yankes.kemkes.go.id/app/siranap', {waitUntil: 'load', timeout: 0});
    // await page.waitForSelector('#propinsi ~ button')//tunggu button terload
    // await page.click('#propinsi ~ button');//click button
    const text = await page.evaluate(() => {
        const listKab = document.querySelector('#propinsi');
        const result = Array.prototype.map.call(listKab.querySelectorAll('option'), (each)=> {
            const nama = each.innerText.trim();
            const prop = each.value;
            return {nama, prop};
        });
        return result;
    });
    await browser.close();
    return Promise.resolve(text);
};

const createKabKotaData = async (propKode) => {
    if (!propKode) return Promise.reject('propKode must be filled');
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.goto('https://yankes.kemkes.go.id/app/siranap', {waitUntil: 'load', timeout: 0});
    // await page.waitForSelector('#propinsi ~ button')//tunggu button terload
    // await page.click('#propinsi ~ button');//click button
    await page.select('#propinsi', propKode);

    await page.waitForSelector('.dropup > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner')
    await page.click('.dropup > .btn > .filter-option > .filter-option-inner > .filter-option-inner-inner');

    await page.waitForSelector('#kabkota ~ button')//tunggu button terload
    await page.click('#kabkota ~ button');//click button
    
    const text = await page.evaluate(() => {
        const listKab = document.querySelector('#kabkota');
        const result = Array.prototype.map.call(listKab.querySelectorAll('option'), (each)=> {
            const nama = each.innerText.trim();
            const prop = each.value;
            return {nama, prop};
        });
        return result;
    });
    await browser.close();
    return Promise.resolve(text);
};
// createKabKotaData('13prop').then(res => console.log(res)).catch('error');

const getHospitalsName = async (kodePropinsi = null, kodeKabupaten = null) => {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.goto('https://yankes.kemkes.go.id/app/siranap/rumah_sakit?jenis=1&propinsi=35prop&kabkota=3505', {waitUntil: 'load', timeout: 0});

    const text = await page.evaluate(() => {
        const el = document.querySelectorAll('.col-md-10 > .row > .cardRS > .card > .card-body');

        const result = Array.prototype.map.call(el, (each)=>{
            const name = each.querySelector('.card-body > .row > .col-md-7 > h5').innerHTML;
            const address = each.querySelector('.card-body > .row > .col-md-7 > .mb-0:nth-child(2)').innerHTML;

            const bedsEl = each.querySelector('.card > .card-body > .row > .col-md-5 > .mb-0 > b');
            const availableBeds = bedsEl? bedsEl.innerText : 'full';

            const lastUpdate = each.querySelector('.card-body > .row > .col-md-5 > .mb-0:nth-child(3)').innerText;
            const phone = each.nextElementSibling.querySelector('.card-footer > div > span').innerText;

            return {name, address, availableBeds, lastUpdate, phone};
        })
        return result;
    })
    await browser.close();
    return new Promise((resolve, reject)=>{
        if(text) resolve(text);
        reject(new Error('something error when gathering data'));
    });
};
module.exports = {
    createPropData,
    createKabKotaData,
    getHospitalsName,
};
// getHospitalsName().then(result => console.log(result)).catch('error');


// urutan data '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-7 > .mb-0:nth-child(1)'
// nama rs '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-7 > .mb-0:nth-child(2)'
// alamat '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-5 > .mb-0 > b'
// jumlah bed kosong '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-5 > .mb-0 > b'
// status antrean '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-5 > .mb-0:nth-child(3)'
// last update '.cardRS:nth-child(1) > .card > .card-body > .row > .col-md-5 > .mb-0:nth-child(4)'
// nomor tpl '.cardRS:nth-child(1) > .card > .card-footer > div > span'

// card body  '.col-md-10 > .row > .cardRS:nth-child(1) > .card > .card-body'



// element dropdown provinsi
// const prop = document.querySelectorAll('#bs-select-1 > ul > li')
