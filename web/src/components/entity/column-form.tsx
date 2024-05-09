import { useNavigate } from 'react-router-dom';
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

export default function ColumnFieldForm() {
    const navigate = useNavigate();
    const form = useForm<ColumnDataFormType>({
        resolver: zodResolver(validateColumnData),
        defaultValues: {
            name: '',
            type: 'int',
            is_unique: false,
            is_primary: false,
            can_null: false,
            default: '',
            is_default: false,
        }
    });
    const onSubmit = () => {
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Enter Column Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={() => (
                            <Select onValueChange={value=>form.setValue('type', value)}>
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
                                            <Input type="checkbox" disabled={form.watch('is_primary') || form.watch('is_default') || form.watch('can_null')} value={String(field.value)} onChange={() => form.setValue('is_unique', !field.value)} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_primary"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl >
                                        <div className='flex items-center gap-2 '>
                                            <Label>
                                                Primary
                                            </Label>
                                            <Input type="checkbox" value={String(field.value)} disabled={form.watch('is_unique') || form.watch('is_default') || form.watch('can_null')} onChange={() => form.setValue('is_primary', !field.value)} />
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
                            name="can_null"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl >
                                        <div className='flex items-center gap-2 '>
                                            <Label>
                                                NULL
                                            </Label>
                                            <Input type="checkbox" disabled={form.watch('is_primary') || form.watch('is_unique') || form.watch('is_default')} value={String(field.value)} onChange={() => form.setValue('can_null', !field.value)} />
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
                                                <Input type="checkbox" value={String(field.value)} disabled={form.watch('is_primary') || form.watch('is_unique') || form.watch('can_null')} onChange={() => form.setValue('is_default', !field.value)} />
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
                        name="default"
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
                    Submit
                </Button>
            </form>
        </Form>
    );
}