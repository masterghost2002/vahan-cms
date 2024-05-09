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
export function AddEntityDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="filled" className="p-[28px] text-xl">Add Entity</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[860px] bg-white text-black">
        <DialogHeader>
          <DialogTitle>Add Entity</DialogTitle>
          <DialogDescription>
            Select entity fields and their type to create a new entity in database
          </DialogDescription>
          <AddColumnDialog/>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
