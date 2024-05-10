import {create} from  'zustand';
import { Tables, TableData } from '../../types';
type EntityStoreType = {
    tables:Tables;
    setTables:(data:Tables)=>void;
    addTable:(data:{entity_name:string, data:Array<TableData>})=>void;
    removeTable:(entity_name:string)=>void;
    getSelectedTable:(entity_name:string)=>Array<TableData>
}
const initialState = {
    tables:{},
}
const useEntityDataStore = create<EntityStoreType>()((set, get)=>({
    ...initialState,
    setTables:(data:Tables)=>set({tables:data}),
    addTable:(data:{entity_name:string, data:Array<TableData>})=>{
        const _prev = {...get().tables};
        _prev[data.entity_name] = data.data;
        set({tables:_prev});
    },
    removeTable:(entity_name:string)=>{
        const _prev = {...get().tables};
        delete _prev[entity_name];
        set({tables:_prev})
    },
    getSelectedTable:(entity_name:string)=>{
        const tableData = get().tables[entity_name];
        if(!tableData) return [];
        return tableData;
    }
}));
export default useEntityDataStore;