// URL= http://www.portal2sounds.com/xxx
// Start 460, End 1497
// Tag = info-quote
// DIRECT LINK
var http = require('http')

const fs = require('fs');
var start = 460;
var end = 1497;

const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = ' http://www.portal2sounds.com/';

async function downloadAll() {
    let browser = await puppeteer.launch();

    for (var i = start; i <= end; i++) {
        var toLoad = url + i;
        console.log("Creating new page for index: " + i + "/" + end)
        let page = await browser.newPage();
        console.log("Loading: " + toLoad);
        await page.goto(toLoad);
        console.log("Getting Content: " + toLoad);
        let html = await page.content();
        console.log("Exporting: " + toLoad);
        save(html);
        page.close();

    }
}


/*
 puppeteer.launch()
 browser.newPage()
  page.goto(url + index)
   page.content()

*/
function save(html) {
    var quote = $('#info-quote', html).text();
    var link = $('#info-link', html).contents()['2'].attribs.href;
    console.log(quote + " - > " + link);

    const file = fs.createWriteStream("quotes/" + quote + ".mp3");
    const request = http.get(link, function (response) {
        console.log(response.statusMessage);

        response.pipe(file);
    });
}
downloadAll();

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');

    });
