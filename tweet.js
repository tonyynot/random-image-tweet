var Twit = require('twit')
    fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    dir = require('node-dir'),
    EventEmitter = require('events').EventEmitter,
    filesEE = new EventEmitter(),
    config = require(path.join(__dirname, 'config.js'));
    images=[];

var tweet = new Twit(config);

var imagesArray = fs.readdirSync('./images/');
console.log('Opening an image...');
imagesArray.forEach( function (file) {
    images.push(file);
});

var randImage = images[Math.floor(Math.random()*images.length)];

console.log(randImage);

function tweetImage(){

  var b64content = fs.readFileSync('./images/' + randImage, { encoding: 'base64' });

  tweet.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err){
      console.log('ERROR');
      console.log(err);
    }
    else{

      console.log('UPLOADING....');

      tweet.post('statuses/update', {
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('aaaaaand its an error.');
            console.log(err);
          }
          else{
            console.log('_______________________________________________________');
            console.log('          BLANKBOT HAS TWEETED AN IMAGE!');
            console.log('          http://twitter.com/blank_waves')
            console.log('_______________________________________________________');

fs.unlink('./images/' + randImage);
          }
        }
      );
    }
  });
}

setInterval(
  tweetImage(),
  10000
);