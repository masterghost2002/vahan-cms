import type { CREATE_TABLE_QUERY_SCHEMA_TYPE } from "../../../types";
const buildCreateTableQuery = (data:CREATE_TABLE_QUERY_SCHEMA_TYPE)=>{
    const table_name = data.table_name;
    let query = `CREATE TABLE IF NOT EXISTS ${table_name} ( \n`;
    const rows = data.rows;
    const rows_length = rows.length;
    for(let index = 0; index<rows_length; index++){
        const field = rows[index];
        let type = field.type;
        if(type === 'char' || type === 'varchar')
            type = `${type}(${field.length?field.length:255})`
        let to_append = `${field.name} ${type} ${field.is_primary?' PRIMARY KEY':''} ${field.is_unique?'UNIQUE':''} ${field.can_null?'':'NOT NULL'}`
        if(index !== rows_length-1)
            to_append = to_append + `,\n`;
        else to_append  = to_append+'\n)'
        query = query + to_append;
    }
    return query;
}
export default buildCreateTableQuery;