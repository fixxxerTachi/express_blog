var Sequelize = require('sequelize');
var sequelize = new Sequelize('puppetz_blog','','',
{
	host: 'localhost',
	dialect: 'mysql',
	define: { charset: 'utf8' }
});
var Article = sequelize.define('article',
{
	title: Sequelize.STRING,
	contents: Sequelize.TEXT
});
exports.Article = Article;
/*
Article.findAll().success(function(articles){
	for(var n in articles){
		console.log(articles[n].title);
	}
});
*/
