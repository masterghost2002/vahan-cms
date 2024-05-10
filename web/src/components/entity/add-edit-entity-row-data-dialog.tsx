import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "../ui/dialog"
import { Button } from "../ui/button";
import { GenericEntityDataField } from "../../../types"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import dataTypeIdToDataType from "../../constant/datatype-id-to-datatype";
import { GenericEntityDataType } from "../../../types";
import axios, { AxiosError } from "axios";
import config from "../../config";
import toast from "react-hot-toast";
type props = {
    fields: Array<GenericEntityDataField>;
    defaultValues?: Record<string, any>;
    primary_key:string;
    entity_name:string;
    type?: "EDIT" | "ADD";
    setData: React.Dispatch<React.SetStateAction<GenericEntityDataType>>
}
const serverUrl = config.serverUrl
export default function AddEditEntityRowDataDialog({primary_key,entity_name,setData, fields, defaultValues, type = "ADD" }:props) {
    const [rowData, setRowData] = useState<Record<string, any>>(defaultValues?defaultValues:{});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')
    const onSubmit = async ()=>{
        setError('');
        const parseData = [];
        for(const key in rowData)
            parseData.push([key, String(rowData[key])]);
        setIsLoading(true);
        const id = toast.loading('Performing action');
        try {
            const url = serverUrl+'/entity/'+(type === "ADD"?'insert':'update');
            if(type === "ADD")
            await axios.post(url, {table_name:entity_name, data:parseData});
            else
            await axios.put(url, {table_name:entity_name, data:parseData, condition:{key:primary_key, value:String(rowData[primary_key])}});
            if(type === "ADD") setData(prev=>{
                const temp = {...prev};
                const rows = [...temp.rows, rowData];
                temp.rows = rows;
                return temp;
            })
            else {
                setData(prev=>{
                    const temp = {...prev};
                    const index = temp.rows.indexOf((data:Record<string, any>)=>data[primary_key] === rowData[primary_key]);
                    if(index === -1) return prev;
                    const rows = [...temp.rows];
                    rows[index] = rowData;
                    temp.rows = rows;
                    return temp;
                })
            }
            toast.remove(id);
            toast.success('Action successfully performed');
        } catch (error) {
            console.log(error);
            if(axios.isAxiosError(error)){
                const axiosError = error as AxiosError
                const errMessage = axiosError?.response?.data?.message;
                setError(errMessage);
            }
            toast.remove(id);
            toast.error('Action failed');
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="filled" className="p-2 text-sm">{type}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[860px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="text-[18px]">{type} Row</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-2">
                    {
                        fields.map(({name, dataTypeID})=>(
                            <div key = {name} className = "flex gap-2 items-center justify-center">
                                <Label>{name}</Label>
                                <Input name={name} disabled = {primary_key === name && type !== "ADD"} onChange={e=>setRowData(prev=>({...prev, [e.target.name]:e.target.value}))} defaultValue={defaultValues?defaultValues[name]:''} type={dataTypeIdToDataType[dataTypeID] === "TIMESTAMP"?"date":"text"}/>
                            </div>
                        ))
                    }
                </form>
                {
                    error && error.length>0 && <div className="text-sm text-red-400">{error}</div>
                }
                <DialogFooter>
                    <Button disabled={isLoading} onClick = {onSubmit} className="bg-blue-500 text-white">{type}</Button>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}