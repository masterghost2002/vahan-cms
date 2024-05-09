import { Request, Response } from "express";
import validateDeleteRowQuery from "./validate.query";
import buildDeleteRowQuery from "./build-delete-row-query";
import getDB from "../../../db";
export default async function DELETE(req:Request, res:Response){
    const data = req.body;
    try {
        const validate = validateDeleteRowQuery.safeParse(data);
        if(!validate.success)
            return res.status(400).json({isError:true, message:'Invalid query data', data:validate.error.errors});
        const query = buildDeleteRowQuery(validate.data);
        const db = await getDB();
        await db.query(query);
        return res.status(200).json('Successfully deleted column');

    } catch (error:any) {
        return res.status(500).json({isError:true, message:error.message});
    }
}   