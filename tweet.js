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

var image = images[Math.floor(Math.random()*images.length)];
console.log(image);

function upload_random_image(){

  // var b64content = fs.readFileSync(image, { encoding: 'base64' });

  console.log('Uploading an image...');

  tweet.post('media/upload', { media_data: image }, function (err, data, response) {
    if (err){
      console.log('ERROR');
      console.log(err);
    }
    else{
      console.log('Uploaded an image!');

      tweet.post('statuses/update', {
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

setInterval(
  upload_random_image(),
  10000
);