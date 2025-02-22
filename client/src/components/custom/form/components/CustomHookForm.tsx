import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { TableContext } from "../../tables/context/TableProvider";
import RenderFormElement from "./RenderFormElement";
import { Form } from "@/components/ui/form";
export default function CustomHookForm() {
    const form = useFormContext();
    const _context = useContext(TableContext);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit()}>
                {
                    _context?.formFields.map((field: ICustomFormField) => {
                        return (
                            <RenderFormElement
                                key={field.name}
                                element={field}
                            />
                        )
                    })
                }
            </form>
        </Form>
    )
}