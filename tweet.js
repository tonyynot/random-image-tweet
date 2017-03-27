var Twit = require('twit')
    fs  = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    shuffle = require('shuffle-array'),
    config = require(path.join(__dirname, 'config.js'));

    var tweet = new Twit(config);

function tweetImage() {


    // Define images path
    var imagesArray = fs.readdirSync('./images/');

    // Shuffle images
    shuffle(imagesArray);

    // Pick random image
    var randImage = shuffle.pick(imagesArray);
    console.log("IMAGE CHOSEN: " + randImage);

    // Convert content to base64
    var b64content = fs.readFileSync('./images/' + randImage, {
        encoding: 'base64'
    });

    // Assign b64 content to tweet
    tweet.post('media/upload', {
        media_data: b64content
    },
    function(err, data, response) {
        if (err) {
            console.log('ERROR');
            console.log(err);
        } 

        else {
            console.log('UPLOADING....');

            // Post tweet
            tweet.post('statuses/update', {
                    media_ids: new Array(data.media_id_string)
                },
                function(err, data, response) {
                    if (err) {
                        console.log('ERROR');
                        console.log(err);
                    } 
                    else {
                        console.log('_______________________________________________________');
                        console.log('          BLANKBOT HAS TWEETED AN IMAGE!');
                        console.log('          http://twitter.com/blank_waves');
                        console.log('_______________________________________________________');

                        // Delete image after tweeting
                        fs.unlinkSync('./images/' + randImage);
                    }
                }
            );
        }
    });
}
setInterval(function() {
    tweetImage();
}, 600000 * 6); // Tweets in 1 hour intervals
