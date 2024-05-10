import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import { GenericEntityDataType } from "../../types";
import config from "../config";
import GenericEntityDataTable from "../components/entity/generic-entity-data-table";
import AddEditEntityRowDataDialog from "../components/entity/add-edit-entity-row-data-dialog";
const serverUrl = config.serverUrl;
export default function EntityDataPage() {
    const params = useParams();
    const entity_name = params.entityName;
    const { data, error, loading, setData } = useFetch<GenericEntityDataType>({ url: serverUrl + '/entity/entity-data/' + entity_name, defaultValues: { primaryKey: '', total: 0, rows: [], fields: [] } });
    // if no entity_name is provided show the message
    if (!entity_name)
        return <div>Please provider valid entity name</div>

    // show the loader till the useFetch is fetching the data from the server
    if (loading)
        return <div>Loading Data please wait</div>

    // if there is an error show the error to the user
    if (error) return <div className="text-red-400">{error}</div>

    //if everthing went correct show all the data of the entity
    return <div className="p-[54px] flex flex-col gap-5">
        <div className="flex items-center justify-between">
            <span className="text-[32px] font-[600]">{entity_name}</span>
            <AddEditEntityRowDataDialog setData={setData} fields={data.fields} primary_key={data.primaryKey} entity_name={entity_name}/>
        </div>
        <span className="text-[16px] font-[600]">Below is all the data of {entity_name} entity</span>
        <GenericEntityDataTable data={data} entity_name={entity_name} setData={setData} />
    </div>
}