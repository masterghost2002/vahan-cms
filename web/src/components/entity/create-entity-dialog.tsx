import { useEffect, useState } from "react";
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { AddColumnDialog } from "./add-column-dialog"
import useCreateEntityStore from "../../store/useCreateEntityStore";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import axios from "axios";
import config from "../../config";
import toast from "react-hot-toast";
import useEntityDataStore from "../../store/useEntityDataStore";
const serverUrl = config.serverUrl;
export function CreateEntityDialog() {
  const addTable = useEntityDataStore(state=>state.addTable)
  const columns = useCreateEntityStore(state => state.columns);
  const name = useCreateEntityStore(state => state.name);
  const setName = useCreateEntityStore(state => state.setName);
  const removeColumn = useCreateEntityStore(state => state.removeColumn);
  const reset = useCreateEntityStore(state => state.reset);

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEntity = async () => {
    if(name.trim().length === 0){
      toast.error('Entity name must not be empty');
      return;
    }
    if(columns.length === 0){
      toast.error('An entity should contain at leat one column');
      return;
    }
    setIsLoading(true);
    const id = toast.loading('Creating Entity');
    try {
      await axios.post(serverUrl + '/entity/create', { table_name:name, columns });
      toast.remove(id);
      toast.success('Entity Created');
      //@ts-ignore
      addTable({entity_name:name, data:columns})
    } catch (error) {
      console.log(error);
      toast.remove(id);
      toast.error('Failed to create entity');
    }finally{
      setIsLoading(false);
    }
  }
  useEffect(() => {
    () => reset();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="filled" className="p-[28px] text-xl">Create Entity</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[860px] bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-[32px]">Create Entity</DialogTitle>
          <div className="flex items-center justify-between">
            <DialogDescription className="text-[16px] font-[500]">
              Add fields and their type to create a new entity in database
            </DialogDescription>
            <AddColumnDialog />
          </div>
        </DialogHeader>
        <Input defaultValue={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Entity Name" />
        {columns.length > 0 &&
          <table className="table-auto  w-full">
            <thead>
              <tr>
                <th className='border border-gray-300 p-2'>Name</th>
                <th className='border border-gray-300 p-2'>Type</th>
                <th className='border border-gray-300 p-2'>Primary</th>
                <th className='border border-gray-300 p-2'>Is Nullable</th>
                <th className='border border-gray-300 p-2'>Default Value</th>
                <th className='border border-gray-300 p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                columns.map((columndata, index) => (
                  <tr key={columndata.column_name} >
                    <td className="border border-gray-300 p-2 font-[500]">{columndata.column_name}</td>
                    <td className="border border-gray-300 p-2">{columndata.data_type}</td>
                    <td className="border border-gray-300 p-2">{columndata.is_primary_key ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 p-2">{columndata.is_nullable ? 'Yes' : 'No'}</td>
                    <td className="border border-gray-300 p-2">{columndata.column_default}</td>
                    <td className="border border-gray-300 flex items-center justify-center">
                      <Button onClick={() => removeColumn(index)} className="p-0 text-red-500 m-0">
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>}
        <DialogFooter>
          <Button disabled={isLoading} onClick={handleCreateEntity}  className="bg-blue-500 text-white">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
