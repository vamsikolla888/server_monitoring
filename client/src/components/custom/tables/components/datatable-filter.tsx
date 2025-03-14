import { useContext, useState } from "react";
import { TableContext } from "../context/TableProvider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { GitPullRequestDraft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import RenderFormElement from "../../form/components/RenderFormElement";
import { ICustomFormField } from "../../form/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultFilter, IFilter } from "@/pages/filemanager/types/types";

export default function DataTableFilter() {
    const [open, setIsOpen] = useState<boolean>(false);
    const _context = useContext(TableContext);
    const filterCount = _context?.state?.filter?.criteria?.length ?? 0;
    const defaultValues = _context?.state?.filterFields.reduce((acc, cur) => {
        acc[cur.name] = "";
        return acc;
    }, {} as Record<string, any>);
    const form = useForm({
        defaultValues
    });
    const clearFilterHandler = () => {
        _context?.dispatch({ type: "SET_FILTERS", payload: { filter: { criteria: [], page: 1, limit: 20 } }});
        form.reset(defaultValues);
    }
    const applyFilterHandler = (values: any) => {        
        let filter: IFilter = {
            ...defaultFilter,
            criteria: [...defaultFilter.criteria]
        };
    
        Object.keys(values).forEach(key => {
            if (values[key]) {
                filter.criteria.push({ key, value: values[key], type: "regexOr" });
            }
        });
        _context?.dispatch({ type: "SET_FILTERS", payload: { filter } });
        setIsOpen(false);
    };
    

    return (
        <Popover open={open} onOpenChange={() => setIsOpen(prev => !prev)}>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2">
                    <GitPullRequestDraft className="size-4 rotate-90" />
                    <span className="text-xs font-semibold">Filters { filterCount > 0 ? `(${filterCount})`: ''}</span>
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 bg-main_background w-[350px] max-h-[450px]">
                <Card className="border-none shadow-none bg-main_background">
                    <CardContent className="px-2">
                        <Form {...form}>
                            <form className="space-y-3" onSubmit={form.handleSubmit(applyFilterHandler)}>
                                <div className="border-b border-border py-4 mb-2">
                                    <p className="text-sm font-medium">Filters</p>
                                </div>

                                <ScrollArea className="h-[250px]">
                                    <div className="space-y-4 px-2">
                                        {_context?.state.filterFields.map((field: ICustomFormField) => (
                                            <RenderFormElement
                                                className="p-0"
                                                key={field.name}
                                                element={field}
                                            />
                                        ))}
                                    </div>
                                </ScrollArea>

                                <Separator className="my-2" />

                                <div className="flex justify-end gap-2">
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
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    );
}
