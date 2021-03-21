const env = process.env;

const config = {
  dbConfig: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '14052003',
    database: env.DB_NAME || 'yard_raffles',
  },
};


module.exports = config;