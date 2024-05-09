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
import ColumnFieldForm from "./column-form"
export function AddColumnDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="filled" className="p-[28px] text-xl">Add Column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
          <DialogDescription>
            Enter the name of column and select the required fields
          </DialogDescription>
        </DialogHeader>
        <ColumnFieldForm/>
        <DialogFooter>
          <Button  className="bg-red-400 text-white">Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
