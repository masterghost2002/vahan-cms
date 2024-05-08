import { VALIDATE_INSERT_DATA_QUERY_SCHEMA_TYPE } from "../../../types";
export default function buildInsertDataQuery(data:VALIDATE_INSERT_DATA_QUERY_SCHEMA_TYPE){
    let query = `INSERT INTO ${data.table_name} (`;
    const values:Array<string> = [];
    const data_to_insert = data.data;
    const length = data_to_insert.length;
    for(let index = 0; index<length; index++){
        query = query + `${data_to_insert[index][0]}`;
        if(index !== length-1)
            query = query + `, `;
        else query = query+')\n';
    }
    query = query +  `VALUES (`;
    for(let index = 0; index<length; index++){
        query = query + `$${index+1}`;
        if(index !== length-1)
            query = query + `, `;
        else query = query+')\n';
        values.push(data_to_insert[index][1]);
    }
    query = query + `RETURNING *;`;
    return {query, values};
}