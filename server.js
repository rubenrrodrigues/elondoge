const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');

const app = express();

// Define the sentiment analyzer
const sentiment = new Sentiment();

// Define the route for the app
app.get('/', (req, res) => {

  // Make a request to Elon Musk's Twitter page
  request('https://twitter.com/elonmusk', (error, response, html) => {

    // Load the HTML response into Cheerio
    const $ = cheerio.load(html);

    // Get the text of the latest tweet
    const latestTweet = $('.tweet').first().find('.tweet-text').text().trim();

    // Analyze the sentiment of the latest tweet
    const sentimentScore = sentiment.analyze(latestTweet).score;

    // Determine whether to buy or sell Dogecoin based on the sentiment score
    const suggestion = (sentimentScore >= 0) ? 'buy' : 'sell';

    // Send the suggestion as a response
    res.send(`Based on Elon Musk's latest tweet (${latestTweet}), you should ${suggestion} Dogecoin.`);
  });

});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
