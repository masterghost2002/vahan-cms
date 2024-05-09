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
type props = {
    entity_name:string
}
export default function DropEntityDialog({entity_name}:props) {
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
                    <AlertDialogAction className="bg-red-500 hover:bg-red-400 rounded-md text-white font-[500]">Drop</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
