import useFetch from "../hooks/useFetch";
import config from "../config";
import type {Tables} from '../../types'
import EntityDetailsTable from "../components/entity/entity-details-table";
import { CreateEntityDialog } from "../components/entity/create-entity-dialog";
import { Link } from "react-router-dom";
import DropEntityDialog from "../components/entity/drop-entity-dialog";
import useEntityDataStore from "../store/useEntityDataStore";
import { useEffect } from "react";
export default function HomePage(){
    const {data, loading, error} = useFetch<Tables>({url:config.serverUrl+'/entity', defaultValues:{}});
    const {tables, setTables} = useEntityDataStore(state=>state)
    useEffect(()=>{
        if(!data || loading || error) return;
        setTables(data);

    },[data, loading, error])
    return (
        <div className="p-[54px] flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h1 className="text-[56px] font-[500]">Entities</h1>
                <CreateEntityDialog/>
            </div>
            <span className="text-[18px] text-gray-800 font-[500]">Below is the list of all the entities present in the database</span>
            {
                loading && <div>Fetching the data Please wait ! </div>
            }
            {
                tables && Object.keys(tables).map((table_name:string)=>{
                    const table_data = tables[table_name];
                    return (
                        <div key={table_name} className="flex flex-col gap-4 border-2 p-[12px] rounded-xl">
                            <div className="flex items-center justify-between">
                            <span className="text-[24px] font-[500]">{table_name}</span>
                            <div className="flex gap-2 items-center">
                               <Link to={`/entity/${table_name}`} className="border-2 p-2 rounded-full font-[500] border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600">Explore</Link>
                               <DropEntityDialog entity_name={table_name}/>
                            </div>
                            </div>
                            <EntityDetailsTable data={table_data} />
                        </div>
                    )
                })
            }
        </div>
    )
}