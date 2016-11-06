var express = require('express');
var router = express.Router();

var History = require('../models/history');

router.get('/', function(req, res){
    History.find({}, {'term':1, 'when':1, '_id':0}).then(function(docs){
        res.send(docs)
    }).catch(function(err){
        res.status(500).send({
            error: err
        })
    });
});

module.exports = router;