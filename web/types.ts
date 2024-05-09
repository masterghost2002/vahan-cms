
export type TableData = {
    column_name: string
    data_type: string
    column_default?: string
    is_nullable: string
    character_maximum_length?: number
    numeric_precision?: number
    numeric_scale?: number
    datetime_precision: any
    is_primary_key: string
    is_unique: string
}
export type Tables = Record<string, Array<TableData>>
