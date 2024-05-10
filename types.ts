import * as z from 'zod';
import createTableQuerySchema from './controller/entity/create/validate.query';
import validateInsertQuery from './controller/entity/entity-data/insert/validate.query';
export type VALIDATE_INSERT_DATA_QUERY_SCHEMA_TYPE  = z.infer<typeof validateInsertQuery>
export type CREATE_TABLE_QUERY_SCHEMA_TYPE = z.infer<typeof createTableQuerySchema>;