import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { ComboBoxField } from "../form/types";

export default function CustomComboBox({
  className,
  placeholder,
  options,
  onChange,
  value,
}: ComboBoxField & ControllerRenderProps<FieldValues, any>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number>(0);

  // Auto-adjust Popover width based on trigger button
  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, open, options.length]);

  const selectedLabel = options.find((item) => item.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "h-12 w-full flex items-center justify-between rounded-md border border-input bg-content-background px-3 py-2 text-sm text-left shadow-sm",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors",
            className
          )}
        >
          <span className={cn(!value && "text-muted-foreground")}>
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: popoverWidth }} // Dynamically set width
        align="start"
      >
        <Command>
          <CommandInput placeholder={placeholder} className="h-10" />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value as string}
                onSelect={(currentValue) => {
                  const newValue = currentValue === value ? null : currentValue;
                  onChange(newValue);
                  setOpen(false);
                }}
              >
                {item.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
