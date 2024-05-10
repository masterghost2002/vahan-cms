import * as z from 'zod';
const validateQuery = z.object({
    entity_name:z.string(),
    condition:z.object({
        key:z.string(),
        value:z.string()
    })
});
export default validateQuery;
export type ValidateDropRowQueryType = z.infer<typeof validateQuery>