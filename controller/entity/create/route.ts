import { Request, Response } from "express";
import getDB from "../../../db";
import validateCreateTableQuery from "./validate.query";
import buildCreateTableQuery from "./build-create-table-query";
export default async function POST(req: Request, res: Response) {
    // get the data from the frontend
    const data = req.body;
    try {
        // validate is the data is  in required form and validate it
        const validate = validateCreateTableQuery.safeParse(data);
        // if the data is not in required format return error to the user along with the fields which are not in correct format
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