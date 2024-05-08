import { Request, Response } from "express";
import getDB from "../../../db";
import validateCreateTableQuery from "./validate.query";
import buildCreateTableQuery from "./build-create-table-query";
const base_create_table_query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY    KEY,
        username VARCHAR(50) UNIQUE    NOT NULL,
        email VARCHAR(100) UNIQUE NOT    NULL
      )
    `
export default async function POST(req: Request, res: Response) {
    const data = req.body;
    try {
        const validate = validateCreateTableQuery.safeParse(data);
        if(!validate.success)
            return res.status(400).json({isError:true, message:'Invalid query data', data:validate.error.errors});
        const queryData = validate.data;
        const query = buildCreateTableQuery(queryData);
        const db = await getDB();
        const result = await db.query(query);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error');
    }

}