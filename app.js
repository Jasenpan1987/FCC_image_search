var express = require('express');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var search = require('./routes/search');
var history = require('./routes/history');

var app = express();

mongoose.connect("mongodb://jasen:jasen@ds063536.mlab.com:63536/fccimgsearch");

app.use('/', routes);
app.use('/search', search);
app.use('/history', history);

var port = process.env.PORT || 8080;

//error handling middleware
app.use(function(req, res) {
    res.status(404).send({
        error: "resource not found!!!"
    })
});

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});