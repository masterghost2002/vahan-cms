import { DeleteRowQueryType } from "./validate.query";
/*
    this function will  build the sql query with the help of the data validate by the zod validator
    it will return a string ex:
    DELETE FROM person 
    WHERE id = 1
    this query will be used to drop the row from the given entity
    
*/
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