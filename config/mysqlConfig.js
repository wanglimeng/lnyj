const Sequelize = require('sequelize');
let mysqlConfig = require('./config.js');
let sequelize = new Sequelize('lnyj','root','',mysqlConfig.mysql);


module.exports = {
	Sequelize:Sequelize,
	sequelize:sequelize
}