import { ValidateDropRowQueryType } from "./validate.query";

export default function buildDropRowQuery(data:ValidateDropRowQueryType){
    const query = `DELETE FROM ${data.entity_name} \n WHERE ${data.condition.key} = ${data.condition.value}`;
    return query;
}