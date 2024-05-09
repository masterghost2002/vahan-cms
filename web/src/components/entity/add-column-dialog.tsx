import { useState } from "react";
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "../ui/dialog"
import ColumnFieldForm from "./column-form";
export function AddColumnDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={(value)=>setIsOpen(value)}>
      <DialogTrigger asChild >
        <Button variant="filled" className="p-[22px] text-[16px] rounded-md">Add Column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Column</DialogTitle>
          <DialogDescription>
            Enter the name of column and select the required fields
          </DialogDescription>
        </DialogHeader>
        <ColumnFieldForm setIsColumnDialogOpen = {setIsOpen}/>
        <DialogFooter>
          <DialogClose  className="bg-red-400 p-[12px] rounded-md text-white">Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
