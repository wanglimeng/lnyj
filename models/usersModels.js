let mysql = require('../config/mysqlConfig.js');
let Sequelize = mysql.Sequelize;
let sequelize = mysql.sequelize;

let User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	}
});

// User.sync({force: true}).then(function () {
// 	return User.create({
// 		username: 'wanglimeng',
// 		password: '122525',
// 		email: '1592138069@qq.com'
// 	});
// });
module.exports = User;

