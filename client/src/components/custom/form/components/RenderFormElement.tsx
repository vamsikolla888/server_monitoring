import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

function getFormElement(field: ICustomFormField) {
    switch(field.type) {
        case "text":
            return Input
        case "number":
            return Input
        default:
            return Input
    }
}

interface IRenderFormElementProps {
    element: ICustomFormField
}
export default function RenderFormElement({ element }: IRenderFormElementProps) {
    const context = useFormContext();
    const FormElement = getFormElement(element);
    return (
        <FormField 
            name={element.name}
            control={context.control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{element.label}</FormLabel>
                    <FormControl>
                        <FormElement {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}