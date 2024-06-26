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
import useEntityDataStore from "../../store/useEntityDataStore";
const serverUrl = config.serverUrl;
type props = {
    entity_name:string
}
export default function DropEntityDialog({entity_name}:props) {
    const [isLoading, setIsLoading] = useState(false);
    const removeTable = useEntityDataStore(state=>state.removeTable);
    const handleDropEntity = async ()=>{
        const id = toast.loading('Droping Entity');
        setIsLoading(true);
        try {
            await axios.put(serverUrl+'/entity/drop', {entity_name});
            setIsLoading(false);
            toast.remove(id);
            toast.success('Entity Dropped')
            removeTable(entity_name);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            toast.remove(id);
            toast.error('Failed to drop Entity')
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="filled" className="bg-red-500 hover:bg-red-400">
                    <div className="flex items-center gap-2">
                        Drop Entity
                        <Trash2 size={18}/>
                    </div>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-red-400">
                        This action cannot be undone. This will permanently drop <span className="text-red-600 text-[18px] font-[600]">{entity_name}</span> entity
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
