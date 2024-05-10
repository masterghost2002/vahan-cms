import { VALIDATE_INSERT_DATA_QUERY_SCHEMA_TYPE } from "../../../../types";
export default function buildInsertDataQuery(data:VALIDATE_INSERT_DATA_QUERY_SCHEMA_TYPE){
    let query = `UPDATE ${data.table_name} \nSET `;
    const data_to_update = data.data;
    const length = data_to_update.length;
    for(let index = 0; index<length; index++){
        query = query + `${data_to_update[index][0]} = '${data_to_update[index][1]}'`;
        if(index !== length-1)
            query = query + `, `;
        else query = query+'\n';
    }
    query = query+`WHERE ${data.condition.key} = ${data.condition.value}` 
    return query;
}