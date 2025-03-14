import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxField } from "../form/types";

export default function CustomCheckbox({ options, className }: CheckboxField) {
    return (
        <div className={className}>
            <div className="flex items-center space-x-4">
                {options.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={item.value as string} value={item.value as string} />
                        <Label htmlFor={item.value as string}>{item.label}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
