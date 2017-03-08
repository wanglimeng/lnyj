


module.exports = {
	mysql: {
		host: 'localhost',
		dialect: 'mysql',

		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}

	},
	mysqlSession: {
		user: 'root',
		password: '',
		database: 'lnyj',
		host: 'localhost'
	}
}