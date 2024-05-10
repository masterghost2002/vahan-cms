import * as z from 'zod';
const validateUpdateQuery = z.object({
    table_name:z.string().regex(/^[a-zA-Z0-9_]{1,63}$/),
    data:z.array(z.array(z.string())),
    condition:z.object({key:z.string(), value:z.string()})
});
export default validateUpdateQuery;
export type ValidateUpdateQueryType = z.infer<typeof validateUpdateQuery>