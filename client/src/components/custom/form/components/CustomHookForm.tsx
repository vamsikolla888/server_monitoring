import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TableContext } from "../../tables/context/TableProvider";
import RenderFormElement from "./RenderFormElement";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { ICustomFormField } from "../types";


interface CustomHookFormProps {
    className?: string;
    headerClassName?: string;
    headerTemplate?: () => React.ReactNode;
    footerClassName?: string;
    footerTemplate?: () => React.ReactNode;
}
export default function CustomHookForm({ className, headerTemplate, footerTemplate }: CustomHookFormProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const form = useFormContext();
    const _context = useContext(TableContext);
    useEffect(() => {
        form.reset();
        if(_context?.state.isEditForm && _context.state.data) {
            _context.state.formFields.forEach(field => {
                form.setValue(field.name, _context.state.data[field.name]);
            })
        }
    },[_context?.state.isEditForm, _context?.state.isFormOpen])

    // const handler = _context?.state.isEditForm ? (values: any) =>  _context.state.updateHandler({ _id: _context.state.data?._id, ...values }, _context.state.data?._id) : _context?.state.createHandler;
    const handler = (values) => {
        setLoading(true);
        if(_context?.state?.isEditForm) {
            _context.state.updateHandler?.({ _id: _context.state.data?._id, ...values }, _context.state.data?._id, setLoading);
        }
        else {
            _context?.state.createHandler?.(values, setLoading)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handler)}>
                <Card className="border-none shadow-none">
                    <CardHeader>
                        {
                        headerTemplate ? 
                        headerTemplate() :
                        <p className="font-semibold text-xl">{_context?.state?.isEditForm ? "Edit" : "Create"} Configuration</p>
                        }
                    </CardHeader>
                    <CardContent>
                        <div className={cn(className)}>
                            {
                                _context?.state.formFields.map((field: ICustomFormField) => {
                                    return (
                                        <RenderFormElement
                                            key={field.name}
                                            element={field}
                                        />
                                    )
                                })
                            }
                        </div>
                    </CardContent>
                    <CardFooter>
                        { footerTemplate ? 
                            footerTemplate() :
                            <div className="w-full pt-5 flex justify-end space-x-4">
                                <Button variant={"destructive"} type={"button"} onClick={() => _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: false }})}>Cancel</Button>
                                <Button type="submit" disabled={loading}>
                                    <div className="flex items-center gap-2">
                                        { loading ?
                                            <>
                                                <Loader className="size-4 animate-spin"/>
                                                <div>{_context?.state?.isEditForm ? "Updating...": "Creating ..."}</div>
                                            </>:
                                            <div>{ _context?.state?.isEditForm ? "Edit": "Create"} Configuration</div>
                                        }
                                    </div>
                                </Button>
                            </div>
                        }
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}