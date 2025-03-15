import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { ICustomFormField } from "../types"
import CustomSelect from "../../html-elements/custom-select"
import CustomRadio from "../../html-elements/custom-radio"
import CustomSwitch from "../../html-elements/custom-switch"
import CustomMultiSelect from "../../html-elements/custom-multi-select"
import CustomCheckbox from "../../html-elements/custom-checkbox"
import CustomCalendar from "../../html-elements/custom-calendar"
import CustomTextArea from "../../html-elements/custom-text-area"
import { cn } from "@/lib/utils"
import CustomComboBox from "../../html-elements/custom-combobox"
import CustomInput from "../../html-elements/custom-input"

function getFormElement(field: ICustomFormField) {
    switch(field.type) {
        case "text":
            return CustomInput
        case "number":
            return Input
        case "select":
            return CustomSelect
        case "radio":
            return CustomRadio
        case "switch":
            return CustomSwitch
        case "multi-select":
            return CustomMultiSelect
        case "checkbox": 
            return CustomCheckbox
        case "calendar":
            return CustomCalendar
        case "textarea":
            return CustomTextArea
        case "combobox":
            return CustomComboBox
        default:
            return CustomInput
    }
}

interface IRenderFormElementProps {
    element: ICustomFormField
    className?: string;
}
export default function RenderFormElement({ element: { showLabel = true, ...element}, className }: IRenderFormElementProps) {
    const context = useFormContext();
    const FormElement = getFormElement(element);
    return (
        <FormField 
            name={element.name}
            control={context.control}
            render={({ field }) => (
                <FormItem className={cn("py-2", className)}>
                    { showLabel && <FormLabel className="text-neutral-800 dark:text-neutral-50">{element.label}</FormLabel> }
                    <FormControl>
                        <FormElement {...field } {...element} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}