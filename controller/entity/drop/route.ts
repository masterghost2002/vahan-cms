import { Request, Response } from "express";
import getDB from "../../../db";
export default async function PUT(req:Request, res:Response){
    const entity_name = req.body.entity_name;
    if(!entity_name || typeof entity_name !== 'string' || entity_name.length > 255)
        return res.status(400).json({isError:true, message:'Invalid entity name', data:{}});
    try {
        const query = `DROP TABLE ${entity_name};`
        const db = await getDB();
        await db.query(query);
        return res.status(201).json('Entity droped');
    } catch (error:any) {
        return res.status(500).json({isError:true, message:error.message});
    }
}