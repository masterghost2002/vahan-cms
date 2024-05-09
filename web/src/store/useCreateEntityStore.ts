import {create} from  'zustand';
import toast from 'react-hot-toast';
import { ColumnDataFormType } from '../components/entity/column-form.validation';
type CreateEntityStore = {
    name:string;
    columns:Array<ColumnDataFormType>;
    setName:(value:string)=>void;
    addColumn:(column:ColumnDataFormType)=>boolean;
    removeColumn:(index:number)=>void;
    reset:()=>void;
}
const initialState = {
    name:'',
    columns:[]
}
const useCreateEntityStore = create<CreateEntityStore>()((set, get)=>({
    ...initialState,
    setName:(value:string)=>set({name:value}),
    addColumn:(column:ColumnDataFormType)=>{
        column.column_name = column.column_name.trim().replace(/\s+/g, '_');
        const _prev = [...get().columns];
        // check if column with same name already exist
        const index = _prev.findIndex(data=>data.column_name === column.column_name);
        if(index !== -1){
            toast.error('Column with same name already present');
            return false;
        }
        _prev.push(column);
        set({columns:_prev});
        return true;
    },
    removeColumn:(index:number)=>{
        const _prev = [...get().columns];
        const filteredColumns = _prev.filter((_, i)=>index!==i);
        set({columns:filteredColumns});
    },
    reset:()=>set(initialState)
}));
export default useCreateEntityStore;