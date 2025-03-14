// import { ColumnHeaderOptions } from "primereact/column";
// import { ITableField } from "../types";



// export default function ColumnHeader({ name, ...props} : ColumnHeaderOptions & ITableField) {
//     console.log("OPTIONS", props);
//     const ignoredKeys = ["checkbox"];
//     return (
//         <>
//             {
//                 !ignoredKeys.includes(name)  && 
//                 <div className="w-full bg-red-500">
//                 <span className="text-md font-bold">Vamsi Krishna</span>
//                 </div>
//             }
//         </>
//     )
// }


import { ColumnHeaderOptions } from "primereact/column";
import { ITableField } from "../types";
import { cn } from "@/lib/utils"; // Your utility for class merging, optional
import { Checkbox } from "primereact/checkbox";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react"; // You can use Lucide or any icon set

interface CustomColumnHeaderProps extends ColumnHeaderOptions, ITableField {}

export default function ColumnHeader({
  name,
  column,
  onSort,
  multiSortMeta,
  sortOrder,
  selectionMode,
  tableProps,
  sortable,
  ...props
}: CustomColumnHeaderProps) {
    console.log("PROPS", props);
  const ignoredKeys = ["checkbox"]; // Fields to ignore normal header rendering, like checkbox

  // For handling sorting (based on PrimeReact sort mechanism)
  const handleSort = () => {
    if (sortable) {
      onSort?.({
        field: column.field,
        order: sortOrder === 1 ? -1 : 1,
      });
    }
  };

  // Determine sort icon based on current sort state
  const renderSortIcon = () => {
    if (!sortable) return null;
    if (sortOrder === 1) return <ArrowUp className="w-4 h-4 ml-2 inline" />;
    if (sortOrder === -1) return <ArrowDown className="w-4 h-4 ml-2 inline" />;
    return <ChevronsUpDown className="w-4 h-4 ml-2 inline opacity-50" />;
  };

  if (name === "Checkbox") {
    return (
        <> </>
    );
  }

  return (
    <>
      {!ignoredKeys.includes(name) && (
        <div
          onClick={handleSort}
          className={cn(
            "flex items-center justify-between cursor-pointer select-none",
            sortable && "hover:text-primary transition-all"
          )}
        >
          <span className="text-md font-bold">{name}</span>
          {renderSortIcon()}
        </div>
      )}
    </>
  );
}
