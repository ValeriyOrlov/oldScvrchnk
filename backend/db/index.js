import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

const {
  PGHOST, PGDATABASE, PGUSER, PGPASSWORD,
} = process.env;

const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  connectionString,
});

pool.on('error', (err, _client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
