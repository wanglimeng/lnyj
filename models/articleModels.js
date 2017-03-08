let mysql = require('../config/mysqlConfig.js');
let Sequelize = mysql.Sequelize;
let sequelize = mysql.sequelize;


let article = sequelize.define('article',{
	username: {
		type:Sequelize.STRING
	},
	article_title: {
		type: Sequelize.STRING
	},
	article_content: {
		type: Sequelize.TEXT
	},
	article_zan: {
		type: Sequelize.STRING(1000)
	},
	article_date: {
		type: Sequelize.STRING
	}
});

article.sync({force:true});



module.exports = article;