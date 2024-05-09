import useFetch from "../hooks/useFetch";
import config from "../config";
import type {Tables} from '../../types'
import EntityDetailsTable from "../components/entity/entity-details-table";
import { CreateEntityDialog } from "../components/entity/create-entity-dialog";
export default function HomePage(){
    const {data, loading,setData, error} = useFetch<Tables>({url:config.serverUrl+'/entity', defaultValues:{}});
    return (
        <div className="p-[54px] flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1 className="text-[56px] font-[500]">Entities</h1>
                <CreateEntityDialog setData={setData}/>
            </div>
            <span className="text-[18px] text-gray-800 font-[500]">Below is the list of all the entities present in the database</span>
            {
                loading && <div>Fetching the data Please wait ! </div>
            }
            {
                data && Object.keys(data).map((table_name:string)=>{
                    const table_data = data[table_name];
                    return (
                        <div key={table_name} className="flex flex-col gap-4 border-2 p-[12px] rounded-xl">
                            <span className="text-[24px] font-[500]">{table_name}</span>
                            <EntityDetailsTable data={table_data} />
                        </div>
                    )
                })
            }
        </div>
    )
}