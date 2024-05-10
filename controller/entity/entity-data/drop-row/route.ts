import { Request, Response } from "express";
import validateQuery from "./validate.query";
import buildDropRowQuery from "./build-drop-row-query";
import getDB from "../../../../db";
export default async function DELETE(req:Request, res:Response){
    const data = req.query;
    try {
        const validate = validateQuery.safeParse({entity_name:data.entity_name, condition:{key:data.key, value:data.value}});
        if(!validate.success)
            return res.status(400).json({isError:true, message:'Invalid query data', data:validate.error.errors});
        const queryData = validate.data;
        const query = buildDropRowQuery(queryData);
        const db = await getDB();
        await db.query(query);
        return res.status(200).json('Row deleted');
    } catch (error) {
        console.log(error);
        return res.status(500).json('Server error');
    }

}