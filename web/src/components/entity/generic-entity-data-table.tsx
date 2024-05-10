import { Edit } from "lucide-react";
import { GenericEntityDataType } from "../../../types"
import { Button } from "../ui/button";
import DropEntityColumnDialog from "./drop-entity-dcolumn-dialog";
import dataTypeIdToDataType from "../../constant/datatype-id-to-datatype";
import AddEditEntityRowDataDialog from "./add-edit-entity-row-data-dialog";
type props = {
    data: GenericEntityDataType;
    entity_name:string;
    setData:React.Dispatch<React.SetStateAction<GenericEntityDataType>>
}
export default function GenericEntityDataTable({ data, entity_name, setData }: props) {
    return (
        <table className="table-auto  w-full">
            <thead>
                <tr>
                    {
                        data.fields.map((field) => (
                            <th key={field.name} className='border border-gray-300 p-2'>
                                <div className="flex flex-col  items-center justify-center">
                                    <span>{field.name}</span>
                                    <span className="text-sm text-gray-700">Type: {dataTypeIdToDataType[field.dataTypeID]}</span>
                                </div>
                            </th>
                        ))
                    }
                    <th  className='border border-gray-300 p-2'>
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.rows.map((rowData, index) => (
                        <tr key={index} >
                            {
                                Object.keys(rowData).map(key => (
                                    <td key={key} className="border border-gray-300 p-2 font-[500]">{rowData[key]}</td>
                                ))
                            }
                            <td className="border border-gray-300 p-2 font-[500]">
                                <div className="flex gap-1 items-center justify-between">
                                    <AddEditEntityRowDataDialog setData={setData} entity_name={entity_name} primary_key={data.primaryKey} fields={data.fields} defaultValues={rowData} type="EDIT"/>
                                    <DropEntityColumnDialog setData={setData} entity_name={entity_name} primary_key={data.primaryKey} primary_key_value={rowData[data.primaryKey]}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>)
}