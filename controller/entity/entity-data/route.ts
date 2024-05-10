import { Request, Response } from "express";
import getDB from "../../../db";
export default async function GET(req: Request, res: Response) {
    let entity_name = req.params.entity_name;
    if (!entity_name || typeof entity_name !== 'string')
        return res.status(400).json({ isError: true, message: 'Invalid entity name', data: {} });
    try {
        const query = `SELECT * FROM ${entity_name.trim().replace(/\s/g, '_')}`;
        const primaryKeyQuery = `
        SELECT a.attname AS column_name
        FROM pg_index i
        JOIN pg_attribute a ON a.attrelid = i.indrelid
                            AND a.attnum = ANY(i.indkey)
        WHERE i.indrelid = '${entity_name}'::regclass
          AND i.indisprimary;
        `
        const db = await getDB();
        const result = await db.query(query);
        const primaryKey = await db.query(primaryKeyQuery);
        const total = result.rowCount;
        const rows = result.rows;
        const fields = result.fields;
        return res.status(200).json({primaryKey:primaryKey.rows[0].column_name, total, rows, fields });
    } catch (error: any) {
        return res.status(500).json({ isError: true, message: error.message });
    }
}