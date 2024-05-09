import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '../ui/form';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import validateColumnData, { type ColumnDataFormType } from './column-form.validation';
import { Label } from '../ui/label';
import dataTypes from '../../constant/postgres-data-types';
import useCreateEntityStore from '../../store/useCreateEntityStore';
type props = {
    setIsColumnDialogOpen:React.Dispatch<React.SetStateAction<boolean>>
}
export default function ColumnFieldForm({setIsColumnDialogOpen}:props) {
    const addColumn = useCreateEntityStore(state=>state.addColumn);
    const form = useForm<ColumnDataFormType>({
        resolver: zodResolver(validateColumnData),
        defaultValues: {
            column_name: '',
            data_type: 'int',
            is_unique: false,
            is_primary_key: false,
            is_nullable: false,
            column_default: '',
            is_default: false,
        }
    });
    const onSubmit = (data:ColumnDataFormType) => {
        const res = addColumn(data);
        if(!res) return;
        setIsColumnDialogOpen(false);
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[47px] w-[418px] h-auto"
            >
                <div className="space-y-[24px]">
                    <FormField
                        control={form.control}
                        name="column_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='text' placeholder="Enter Column Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="data_type"
                        render={() => (
                            <Select onValueChange={value=>form.setValue('data_type', value)}>
                                <SelectTrigger className="w-full bg-white">
                                    <SelectValue placeholder="Select Data type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        {
                                            dataTypes.map(({value, name})=><SelectItem key={value} value={value}>{name}</SelectItem>)
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <div className='flex items-center justify-between w-full'>
                        <FormField
                            control={form.control}
                            name="is_unique"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl >
                                        <div className='flex items-center gap-2 '>
                                            <Label>
                                                Unique
                                            </Label>
                                            <Input type="checkbox" disabled={form.watch('is_primary_key') || form.watch('is_default') || form.watch('is_nullable')} value={String(field.value)} onChange={() => form.setValue('is_unique', !field.value)} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_primary_key"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl >
                                        <div className='flex items-center gap-2 '>
                                            <Label>
                                                Primary
                                            </Label>
                                            <Input type="checkbox" value={String(field.value)} disabled={form.watch('is_unique') || form.watch('is_default') || form.watch('is_nullable')} onChange={() => form.setValue('is_primary_key', !field.value)} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <FormField
                            control={form.control}
                            name="is_nullable"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl >
                                        <div className='flex items-center gap-2 '>
                                            <Label>
                                                NULL
                                            </Label>
                                            <Input type="checkbox" disabled={form.watch('is_primary_key') || form.watch('is_unique') || form.watch('is_default')} value={String(field.value)} onChange={() => form.setValue('is_nullable', !field.value)} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_default"
                            render={({ field }) => {
                                return (
                                    <FormItem className='w-full'>
                                        <FormControl >
                                            <div className='flex items-center gap-2 '>
                                                <Label>
                                                    Default
                                                </Label>
                                                <Input type="checkbox" value={String(field.value)} disabled={form.watch('is_primary_key') || form.watch('is_unique') || form.watch('is_nullable')} onChange={() => form.setValue('is_default', !field.value)} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                            }
                        />
                    </div>
                    {form.watch('is_default') === true && <FormField
                        control={form.control}
                        name="column_default"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Enter Default Value" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />}
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    variant={'filled'}
                >
                    Add Column
                </Button>
            </form>
        </Form>
    );
}