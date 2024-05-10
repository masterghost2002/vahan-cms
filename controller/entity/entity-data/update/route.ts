import { Request, Response } from "express";
import getDB from "../../../../db";
import validateUpdateQuery from "./validate.query";
import buildUpdateDataQuery from "./build-update-data-query";
export default async function PUT(req:Request, res:Response){
    const data = req.body;
    try {
        //first validate the query data send from the user
        const validate = validateUpdateQuery.safeParse(data);
        if(!validate.success)
            return res.status(400).json({isError:true, message:'Invalid update data', data:validate.error.errors});
        const query = buildUpdateDataQuery(validate.data);
        const db = await getDB();
        const result = await db.query(query);
        return res.status(200).json({isError:false, message:"Data upated", data:result})
    } catch (error:any) {
        return res.status(500).json({isError:true, message:error.message});
    }
}