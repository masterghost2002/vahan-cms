import * as z from 'zod';
import createTableQuerySchema from './controller/entity/create/validate.query';
export type CREATE_TABLE_QUERY_SCHEMA_TYPE = z.infer<typeof createTableQuerySchema>;