import pg from 'pg';
const { Client } = pg;
let db: undefined | pg.Client;
export default async function getDB() {
    if (!db) {
        db = new Client({
            connectionString: process.env.DATABASE_URL
        });
        await db.connect();
    }
    return db;
}
