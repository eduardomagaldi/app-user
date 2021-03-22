const { Pool } = require('pg');

module.exports = new Pool({
	user: process.env.DB_USER || 'eduardomagaldi',
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_DATABASE || 'postgres',
	password: process.env.DB_PASSWORD || '',
	port: process.env.DB_PORT || 5432,
});
