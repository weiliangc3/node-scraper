const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
const urlModule = require('url');

console.log('weilcome to the scraper.')

const urls = ['https://something.com/something'];

function writeNewFile(url, destination, html) {
  stringToWrite = `${$('.selectors1',html).html()} \n\n\n ${$('.selectors2', html).html()}`

  fs.writeFile(destination, stringToWrite, function(err) {
    if(err) {
        return console.log(err);
    }
  });
}

urls.map((url) => {
  rp(url)
  .then(function(html){
    if (!fs.existsSync('build/')){
      fs.mkdirSync('build/');
  }

    urlObject = urlModule.parse(url)
    const destination = `build/${(urlObject.pathname).replace(/\//g,".")}.txt`
    if (fs.existsSync(destination)) {
      fs.unlink(destination, () => {
        writeNewFile(url, destination, html);
      });
    } else {
      writeNewFile(url, destination, html);
    }
  })
  .catch(function(err){
    console.log('whoops.')
  });
})

