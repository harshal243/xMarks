var fs = require('fs');
var express = require('express');
var _ = require('lodash');

//express app initialization
var app = express();

//routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/categories', function (req, res) {
  fs.readFile('category.json', function(error, data) {
    if(error) {
      throw error;
    };
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(data);
  });
});

app.get('/cards/:categoryId', function (req, res) {
  //cards
  var cards;
  fs.readFile('card.json', function(error, data) {
    if(error) {
      throw error;
    };

    cards = JSON.parse(data);

    var categoryId = req.params.categoryId;

    var cardsForThisCategory = _.filter(cards, function(card) {
    return card.categoryid === categoryId;
    });

    res.status(200).json(cardsForThisCategory);
  });

});


  //Server start
  var server = app.listen(8000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('XMarks app listening at http://%s:%s', host, port);

});
