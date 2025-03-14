import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SwitchField } from "../form/types"
import { cn } from "@/lib/utils"
 
export default function CustomSwitch({ label, id, className }: SwitchField) {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Switch id={id} />
            <Label htmlFor="airplane-mode">{label}</Label>
        </div>
    )
}