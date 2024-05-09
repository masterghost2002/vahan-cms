import * as z from 'zod';
const validateDeleteRowQuery = z.object({
    table_name:z.string().regex(/^[a-zA-Z0-9_]{1,63}$/, {message:"Please provide correct table name"}),
    where_conditions:z.array(z.object({condition:z.string(), value:z.string()}))
});
export default validateDeleteRowQuery;
export type DeleteRowQueryType = z.infer<typeof validateDeleteRowQuery>;