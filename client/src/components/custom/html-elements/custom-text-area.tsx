import { Textarea } from "@/components/ui/textarea";
import { TextAreaField } from "../form/types";

export default function CustomTextArea({ className, placeholder, value, rows = 4 }: TextAreaField) {
    return (
        <div className={"flex flex-col gap-2 " + className}>
            <Textarea
                placeholder={placeholder}
                value={value}
                rows={rows}
                className="resize-none h-28"
            />
        </div>
    )
}
