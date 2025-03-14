import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SelectField } from "../form/types"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

export default function CustomSelect({ className, placeholder, options, onChange, value, name }: SelectField & ControllerRenderProps<FieldValues, any>) {
    return (
        <Select onValueChange={onChange} value={value} name={name}>
            <SelectTrigger className={"h-12 " + className}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        options.map(item => (
                            <SelectItem value={item.value as string}>{item.label}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}