import { useCallback, useContext, useState } from "react";
import lodash from "lodash";
import { TableContext } from "../context/TableProvider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { GitPullRequestDraft, Trash, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import RenderFormElement from "../../form/components/RenderFormElement";
import { ICustomFormField } from "../../form/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultFilter, IFilter } from "@/pages/filemanager/types/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export default function DataTableDynamicFilter() {
    const [open, setIsOpen] = useState<boolean>(false);
    const _context = useContext(TableContext);

    const criteriaSchema = z.object({
        key: z.string().min(1, 'key is required'),
        value: z.string().min(1, 'value is required'),
        type: z.string().min(1, 'type is required'),
    })

    const filterSchema = z.object({
        filter: z.array(criteriaSchema)
    })
    const form = useForm({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            filter: [
                { key: "", value: "", type: "eq" },
            ]
        }
    });


    const filterCount = _context?.state?.filter?.criteria?.length ?? 0;
    const filterFieldsOptions = (_context?.state?.filterFields as ICustomFormField[]).map(item => ({ label: item.label, value: item.name }));
    const typeOptions = [{ label: "Is", value: "eq" }, { label: "Contains", value: "in" }, { label: "Is not", value: "ne" }, { label: "Does not contain", value: "nin"}];
    const formValues = form.getValues()?.filter ?? [];
    const filterFields: ICustomFormField = [ 
        {name: "key", label: "", placeholder: "Select field", type: "combobox", options: filterFieldsOptions, displayInAddForm: true, displayInEditForm: true, showLabel: false, className: "h-9 w-[150px] max-w-[200px] text-xs" },
        {name: "type", label: "", placeholder: "", type: "select", options: typeOptions, displayInAddForm: true, displayInEditForm: true, showLabel: false, className: "h-9 w-[100px] max-w-[150px] text-xs" },
    ];

    const getValueField = useCallback((index:number) => {
        const tableField = formValues[index].key;
        let findTableFilterField = _context?.state?.filterFields.find(item => item.name == tableField) ?? { label: "", placeholder: "Enter a value", type: "text", displayInAddForm: true, displayInEditForm: true, showLabel: false, className: "h-9 text-xs placeholder:text-xs" };
        return lodash.omit(findTableFilterField, ["name"]);
    }, [formValues])


    /**@DynamicArray to add & remove of fields */
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "filter"
    });    


    const clearFilterHandler = () => {
        _context?.dispatch({ type: "SET_FILTERS", payload: { filter: { criteria: [], page: 1, limit: 20, sortField: _context?.state?.filter?.sortField ?? "created" } }});
        form.reset();
        // setIsOpen(false);
    }
    const applyFilterHandler = (values: any) => {     
        console.log("VALUES", values);   
        let filter: IFilter = {
            ...defaultFilter,
            criteria: values?.filter ?? []
        };
        _context?.dispatch({ type: "SET_FILTERS", payload: { filter } });
        setIsOpen(false);
    };
    

    console.log("FIELDS", fields, form.getValues());

    return (
        <Popover open={open} onOpenChange={() => setIsOpen(prev => !prev)}>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2">
                    <GitPullRequestDraft className="size-4 rotate-90" />
                    <span className="text-xs font-semibold">Filters { filterCount > 0 ? `(${filterCount})`: ''}</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 bg-neutral-50 dark:bg-main_background w-full max-h-[450px] mt-2">
                <Card className="border-none shadow-none bg-main_background">
                    <CardContent className="px-2">
                        <Form {...form}>
                            <form className="space-y-3" onSubmit={form.handleSubmit(applyFilterHandler)}>
                                <div className="border-b border-border py-4 mb-2">
                                    <p className="text-md font-bold">Filters</p>
                                </div>

                                <ScrollArea className="h-[250px]">

                                    {
                                        fields.map((item, index) => (
                                            <div className="flex gap-4 items-start px-2">
                                                {
                                                    filterFields.map((field: ICustomFormField) => (
                                                        <>
                                                            <RenderFormElement 
                                                            key={`filter.${index}.${field.name}`}
                                                            element={{...field, name: `filter.${index}.${field.name}`}}
                                                            />
                                                        </>
                                                    ))
                                                }   
                                                <RenderFormElement 
                                                    key={`filter.${index}.value}`}
                                                    element={{...getValueField(index), name: `filter.${index}.value`}}
                                                />
                                                <div className="py-2">
                                                    <Button variant={"ghost"} className="border-[.5px]" onClick={() => remove(index)}>
                                                        <Trash2 className="text-rose-600"/>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </ScrollArea>

                                <Separator className="my-2" />

                                <div className="flex justify-between gap-2 px-4">
                                    <div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => append({ key: "", value: "", type: "eq" })}
                                        >
                                            Add Filter
                                        </Button>
                                    </div>
                                    <div className="space-x-4">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearFilterHandler}
                                        >
                                            Clear
                                        </Button>
                                        <Button type="submit" size="sm">
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>  
    )
}