const { Pool } = require('pg');

module.exports = new Pool({
	user: process.env.DB_USER || 'masteruser',
	host: process.env.DB_HOST || '.sa-east-1.rds.amazonaws.com',
	database: process.env.DB_DATABASE || 'db',
	password: process.env.DB_PASSWORD || 'xxxxxx',
	port: process.env.DB_PORT || 5432,
});
