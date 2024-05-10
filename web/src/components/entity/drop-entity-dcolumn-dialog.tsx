import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import axios from 'axios';
import config from "../../config";
import toast from "react-hot-toast";
import type { GenericEntityDataType } from "../../../types";
const serverUrl = config.serverUrl;
type props = {
    entity_name:string;
    primary_key_value:string;
    primary_key:string;
    setData:React.Dispatch<React.SetStateAction<GenericEntityDataType>>
}
export default function DropEntityColumnDialog({entity_name, primary_key, primary_key_value, setData}:props) {
    const [isLoading, setIsLoading] = useState(false);
    const handleDropEntity = async ()=>{
        const id = toast.loading('Droping Entity');
        setIsLoading(true);
        try {
            await axios.delete(serverUrl+'/entity/drop-row?'+`entity_name=${entity_name}&key=${primary_key}&value=${primary_key_value}`);
            setIsLoading(false);
            toast.remove(id);
            toast.success('Row Dropped')
            setData(prev=>{
                const temp = {...prev};
                const rows = [...temp.rows].filter(data=>data[primary_key] !== primary_key_value);
                temp.rows = rows;
                return temp;
            })
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            toast.remove(id);
            toast.error('Failed to drop row')
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="filled" className="bg-red-500 hover:bg-red-400">
                        <Trash2 size={16}/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-red-400">
                        This action cannot be undone. This will permanently drop the column where  <span className="text-red-600 text-[18px] font-[600]">{primary_key} = {primary_key_value}</span> of  <span className="text-red-600 text-[18px] font-[600]">{entity_name}</span> entity
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={handleDropEntity} className="bg-red-500 hover:bg-red-400 rounded-md text-white font-[500]">Drop</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
