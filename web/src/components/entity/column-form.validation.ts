import * as z from 'zod';
const validateColumnData = z.object({
    column_name: z.string(),
    data_type: z.string().regex(/^(int|bigint|smallint|numeric|decimal|real|double precision|serial|money|varchar|char|text|bytea|timestamp|date|time|boolean|json|jsonb|uuid|xml)$/i),
    is_unique: z.boolean().default(false),
    is_primary_key: z.boolean().default(false),
    is_nullable: z.boolean().default(false),
    column_default: z.string().optional(),
    character_maximum_length:z.number().optional(),
    is_default:z.boolean().default(false)
}).refine(data=> {
    if (data.is_primary_key && data.is_nullable) {
        throw new Error("Primary key cannot be nullable");
    }
    if (data.is_unique && data.is_nullable) {
        throw new Error("Unique key cannot be nullable");
    }
    if (data.is_primary_key && data.is_unique) {
        throw new Error("Column cannot be both primary and unique");
    }
    if ((data.data_type === "varchar" || data.data_type === "char") && typeof data.column_default === 'string' && data.column_default.length > 255) {
        throw new Error("Default value exceeds maximum length for varchar/char type");
    }
    return true;
});
export default validateColumnData;
export type ColumnDataFormType = z.infer<typeof validateColumnData>