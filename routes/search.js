var express = require('express');
var router = express.Router();
var Search = require('bing.search');

var History = require('../models/history');

var search = new Search('6VZNrNhZd6ykCaV8VLj8ENzfotT44z+zMT/oNflrtAo');

router.get('/:keyword', function(req, res) {
    var keyword = req.params.keyword;
    var num = req.query.offset||5;

    search.images(keyword, {top: num},
        function(err, results) {
            if(err){
                res.status(500).send({
                    error: "search error"
                });
            }else{
                //res.send(results);
                var formattedResult = results.map(function(result){
                    return {
                        url: result.url,
                        title: result.title,
                        thumbnail: result.thumbnail.url,
                        sourceUrl: result.sourceUrl
                    }
                });

                var history = new History({
                    term: keyword,
                    when: new Date()
                });

                history.save(function(err){
                    if(err){
                        console.log("save history error", err);
                    }else{
                        console.log("save history successful");
                    }
                    res.send(formattedResult);
                });
            }
        }
    );
});

router.get('/', function(req, res, next) {
    res.send('./ response');
});

module.exports = router;