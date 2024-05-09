import { DeleteRowQueryType } from "./validate.query";

export default function buildDeleteRowQuery(data:DeleteRowQueryType){
    let query = `DELETE FROM ${data.table_name} \n WHERE `;
    const where_conditions = data.where_conditions;
    const length = where_conditions.length;
    for(let index = 0; index<length; index++){
        const {condition, value} = where_conditions[index];
        query = query+`${condition} = ${value}`;
        if(index !== length-1)
            query = query+` AND `;
        else query = query + `;`
    }
    return query;

}