import { Request, Response } from "express";
import getDB from "../../db";
const query = `
SELECT 
    cols.table_name,
    cols.column_name,
    cols.data_type,
    cols.column_default,
    cols.is_nullable,
    cols.character_maximum_length,
    cols.numeric_precision,
    cols.numeric_scale,
    cols.datetime_precision,
    CASE 
        WHEN cons.constraint_type = 'PRIMARY KEY' THEN 'Yes'
        ELSE 'No'
    END AS is_primary_key,
    CASE 
        WHEN cons.constraint_type = 'UNIQUE' THEN 'Yes'
        ELSE 'No'
    END AS is_unique
FROM 
    information_schema.columns cols
LEFT JOIN 
    information_schema.key_column_usage kcu 
    ON cols.table_name = kcu.table_name 
    AND cols.column_name = kcu.column_name
LEFT JOIN 
    information_schema.table_constraints cons 
    ON kcu.constraint_name = cons.constraint_name
WHERE 
    cols.table_schema = 'public'
ORDER BY 
    cols.table_name, 
    cols.ordinal_position;
`
export default async function GET(_: Request, res: Response) {
    try {
        const db = await getDB();
        const result = await db.query(query);
        const rows = result.rows;
        const tables:Record<string, Array<Record<string, string>>> = {};
        rows.forEach(data=>{
            const {table_name,...columnData} = data;
            if(!tables[table_name]) tables[table_name] = [];
            tables[table_name].push(columnData);
        });
        return res.status(200).json(tables)
    } catch (error: any) {
        return res.status(500).json({ isError: true, message: error.message });

    }
}