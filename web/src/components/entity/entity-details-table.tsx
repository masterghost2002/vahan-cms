import type {TableData} from '../../../types'
type props = {
    data:Array<TableData>
}
export default function EntityDetailsTable({data}:props) {
    return (
        <table className="table-auto  w-full">
            <thead>
                <tr>
                    <th className='border border-gray-300 p-2'>Name</th>
                    <th className='border border-gray-300 p-2'>Type</th>
                    <th className='border border-gray-300 p-2'>Primary</th>
                    <th className='border border-gray-300 p-2'>Max Length</th>
                    <th className='border border-gray-300 p-2'>Is Nullable</th>
                    <th className='border border-gray-300 p-2'>Default Value</th>
                </tr>
            </thead>
            <tbody>
               {
                data.map(columndata=>(
                    <tr key={columndata.column_name} >
                    <td className="border border-gray-300 p-2 font-[500]">{columndata.column_name}</td>
                    <td className="border border-gray-300 p-2">{columndata.data_type}</td>
                    <td className="border border-gray-300 p-2">{columndata.is_primary_key}</td>
                    <td className="border border-gray-300 p-2">{columndata.character_maximum_length}</td>
                    <td className="border border-gray-300 p-2">{columndata.is_nullable}</td>
                    <td className="border border-gray-300 p-2">{columndata.column_default}</td>
                </tr>
                ))
               }
            </tbody>
        </table>
    )
}