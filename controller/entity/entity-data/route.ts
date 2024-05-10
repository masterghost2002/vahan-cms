import { Request, Response } from "express";
import getDB from "../../../db";
export default async function GET(req: Request, res: Response) {
    let entity_name = req.params.entity_name;
    if (!entity_name || typeof entity_name !== 'string')
        return res.status(400).json({ isError: true, message: 'Invalid entity name', data: {} });
    try {
        const query = `SELECT * FROM ${entity_name.trim().replace(/\s/g, '_')}`
        const db = await getDB();
        const result = await db.query(query);
        const total = result.rowCount;
        const rows = result.rows;
        const fields = result.fields;
        return res.status(200).json({ total, rows, fields});
    } catch (error: any) {
        return res.status(500).json({ isError: true, message: error.message });
    }
}