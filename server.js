var fs = require('fs');
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');

//express app initialization
var app = express();
app.use(bodyParser.json());

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

//Add Card
app.post('/addCard', function(req, res) {
  var cards;
  fs.readFile('card.json', function(error, data) {
    if(error) {
      throw error;
    };

    cards = JSON.parse(data);
    cards.push(req.body);

    // null - represents the replacer function. (in this case we don't want to alter the process)
    // 2 - represents the spaces to indent.
    fs.writeFileSync('card.json', JSON.stringify(cards, null,  2));

    res.status(200);
    res.end();

  });
});



  //Server start
  var server = app.listen(8000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('XMarks app listening at http://%s:%s', host, port);

});
