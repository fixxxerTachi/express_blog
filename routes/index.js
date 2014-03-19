
/*
 * GET home page.
 */
var Article = require('../models/article').Article;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.article = function(req,res){
	Article.findAll().success(function(articles){
		res.render('index',{ articles: articles });
	})
};
