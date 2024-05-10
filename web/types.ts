export type EntityData = {
    name:string;
    type:string;
    is_unique?:boolean;
    is_primary?:boolean;
    can_null?:boolean;
    is_default?:boolean;
    default?:string;
}
export type TableData = {
    column_name: string
    data_type: string
    column_default?: string
    is_nullable: string | boolean
    is_default?:boolean
    character_maximum_length?: number
    numeric_precision?: number
    numeric_scale?: number
    datetime_precision?: any
    is_primary_key: string
    is_unique: string
}
export type GenericEntityDataField = {
    name:string;
    tableID?:number;
    columnID?:number;
    dataTypeID:number;
    dataTypeModifier?:number;
    format:string;
}
export type GenericEntityDataType = {
    total:number;
    primaryKey:string;
    rows:Array<Record<string, any>>;
    fields:Array<GenericEntityDataField>

}
export type Tables = Record<string, Array<TableData>>
