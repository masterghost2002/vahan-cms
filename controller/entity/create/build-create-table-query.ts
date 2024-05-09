import type { CREATE_TABLE_QUERY_SCHEMA_TYPE } from "../../../types";
const buildCreateTableQuery = (data:CREATE_TABLE_QUERY_SCHEMA_TYPE)=>{
    const table_name = data.table_name;
    let query = `CREATE TABLE IF NOT EXISTS ${table_name} ( \n`;
    const columns = data.columns;
    const columns_length = columns.length;
    for(let index = 0; index<columns_length; index++){
        const field = columns[index];
        let data_type = field.data_type;
        if(data_type === 'char' || data_type === 'varchar')
            data_type = `${data_type}(${field.character_maximum_length?field.character_maximum_length:255})`
        let to_append = `${field.column_name} ${data_type} ${field.is_primary_key?' PRIMARY KEY':''} ${field.is_unique?'UNIQUE':''} ${field.is_nullable?'':'NOT NULL'} ${field.column_default?`DEFAULT ${field.column_default}`:''}`
        if(index !== columns_length-1)
            to_append = to_append + `,\n`;
        else to_append  = to_append+'\n)'
        query = query + to_append;
    }
    return query;
}
export default buildCreateTableQuery;