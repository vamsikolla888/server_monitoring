import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioField } from "../form/types";


export default function CustomRadio({ options, className }: RadioField) {
    return (
        <RadioGroup defaultValue="comfortable" className={className}>
            <div className="flex items-center space-x-2">
                {
                    options.map(item => (
                        <>
                            <RadioGroupItem value={item.value as string} id={item.value as string} />
                            <Label htmlFor="r1">{item.label}</Label>
                        </>
                    ))
                }
            </div>
      </RadioGroup>
    )
}