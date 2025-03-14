

import { ColumnHeaderOptions } from "primereact/column";
import { ITable, ITableField } from "../types";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, ChevronsUpDown, X } from "lucide-react";
import { useContext } from "react";
import { TableContext } from "../context/TableProvider";

interface CustomColumnHeaderProps extends ColumnHeaderOptions, ITableField { }

export default function ColumnHeader({
  name,
  field,
  column,
  onSort,
  sortOrder,
  sortable,
  ...props
}: CustomColumnHeaderProps) {
  console.log("PROPS", props);
  const _context = useContext(TableContext);
  const ignoredKeys = ["checkbox"];
  const sortField = _context?.state?.filter?.sortField ?? "created";
  const direction = _context?.state?.filter?.direction ?? "desc";
  const filterExists = _context?.state?.filter?.criteria.findIndex(item => item.key === field);

  const handleSort = () => {
    let newDirection = direction === "desc" ? "asc" : "desc";
    let sortField = field;
    _context?.dispatch({ type: "ALL", payload: { data: { filter: { ..._context?.state?.filter, sortField: sortField, direction: newDirection } } as ITable }});
  };

  const renderSortIcon = () => {
    return(
      <div onClick={handleSort}> 
        {
          field === sortField && direction === "asc" 
          ? <ArrowUp className="w-4 h-4 ml-2 inline" /> : 
          field === sortField && direction === "desc" ? <ArrowDown className="w-4 h-4 ml-2 inline" /> :
          <ChevronsUpDown className="w-4 h-4 ml-2 inline opacity-50" />
        }
      </div>
    )
  };

  const clearFilter = (e) => {
    // _context?.dispatch({ type: "ALL", payload: { filter: {..._context?.state?.filter, criteria: _context?.state?.filter?.criteria.filter(item => item.key !== field )}}})
    _context?.dispatch({ type: "ALL", payload: { data: { filter: { ..._context?.state?.filter, criteria: _context?.state?.filter?.criteria?.filter(item => item.key !== field)}} as ITable}})
  }

  if (name === "Checkbox") {
    return (
      <> </>
    );
  }

  return (
    <>
      {!ignoredKeys.includes(name) && (
        <div
          className={cn(
            "flex items-center justify-between cursor-pointer select-none gap-4 w-max-[100px] h-[30px]",
            sortable && "hover:text-primary transition-all"
          )}
        >
          <span className="text-md font-bold">{name}</span>
          {sortable && renderSortIcon()}
          <div onClick={clearFilter}>
            {
              filterExists >=0 && <X className="size-4 text-red-600 flex-1"/>
            }
          </div>
        </div>
      )}
    </>
  );
}
