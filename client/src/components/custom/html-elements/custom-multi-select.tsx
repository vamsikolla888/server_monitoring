import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { SelectField } from "../form/types";

export default function CustomMultiSelect({
  className,
  placeholder = "Select options",
  options,
  onChange,
}: SelectField & { onChange?: (value: string[]) => void }) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    let updatedValues = [...selectedValues];
    if (updatedValues.includes(value)) {
      updatedValues = updatedValues.filter((item) => item !== value);
    } else {
      updatedValues.push(value);
    }
    setSelectedValues(updatedValues);
    onChange && onChange(updatedValues); // Call onChange if provided
  };

  const getSelectedLabels = () => {
    if (selectedValues.length === 0) return placeholder;
    const selectedLabels = options
      .filter((item) => selectedValues.includes(item.value as string))
      .map((item) => item.label);
    return selectedLabels.join(", ");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded="false"
          className={`h-12 w-full justify-between ${className}`}
        >
          <span className="truncate">{getSelectedLabels()}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandGroup>
            {options.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => toggleSelection(item.value as string)}
                className="flex space-x-2 items-center cursor-pointer"
              >
                <Checkbox
                  checked={selectedValues.includes(item.value as string)}
                  className="h-4 w-4"
                  onCheckedChange={() => toggleSelection(item.value as string)}
                />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
