import * as z from 'zod';
const rowSchema = z.object({
    name: z.string(),
    type: z.string().regex(/^(int|bigint|smallint|numeric|decimal|real|double precision|serial|money|varchar|char|text|bytea|timestamp|date|time|boolean|json|jsonb|uuid|xml)$/i),
    is_unique: z.boolean().default(false),
    is_primary: z.boolean().default(false),
    can_null: z.boolean().default(false),
    default: z.string().optional(),
    length:z.number().optional()
}).refine(data => {
    if (data.is_primary && data.can_null) {
        throw new Error("Primary key cannot be nullable");
    }
    if (data.is_unique && data.can_null) {
        throw new Error("Unique key cannot be nullable");
    }
    if (data.is_primary && data.is_unique) {
        throw new Error("Column cannot be both primary and unique");
    }
    if ((data.type === "varchar" || data.type === "char") && typeof data.default === 'string' && data.default.length > 255) {
        throw new Error("Default value exceeds maximum length for varchar/char type");
    }
    return true;
});

const validateCreateTableQuery = z.object({
    table_name:z.string().regex(/^[a-zA-Z0-9_]{1,63}$/),
    rows:z.array(rowSchema)
});
export default validateCreateTableQuery;