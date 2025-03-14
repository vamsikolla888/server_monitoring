import { Input } from "@/components/ui/input";
import { TextField } from "../form/types";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function CustomInput({
  className,
  placeholder,
  onChange,
  value,
  name,
  type = "text",
  disabled = false,
}: TextField & ControllerRenderProps<FieldValues, any>) {
  return (
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn("h-12", className)}
      disabled={disabled}
    />
  );
}
