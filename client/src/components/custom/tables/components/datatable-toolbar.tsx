import { useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableContext } from "../context/TableProvider";
/**@Icons */
import { Plus, Search, Upload, Download, Trash, RefreshCcw } from "lucide-react";
import DataTableDynamicFilter from "./datatable-dynamic-filter";


export default function DatatableToolbar() {
    const [globalSearch, setGlobalSearch] = useState<string>("");
    const _context = useContext(TableContext);
    const selectedRows = _context?.state?.selectedRows as [] ?? [];


    /**@LifeCyle */
    useEffect(() => {
            const debouncedSearch = debounce((searchTerm) => {
                _context?.dispatch({ type: "SET_FILTERS", payload: { filter: { globalSearch: { type: "user", value: searchTerm }}}})
            }, 300);
          
            if (globalSearch || globalSearch === "") {
              debouncedSearch(globalSearch);
            }
          
            return () => {
              debouncedSearch.cancel();
            };
    },[globalSearch])


    const toolbarOptions = [
        {name: "Export", icon: Upload, show: true },
        {name: "Import", icon: Download, show: true },
        {name: "Refresh", icon: RefreshCcw, show: true, actionHandler: _context?.state?.refetch },
        {name: "Delete", icon: Trash, show: selectedRows.length > 0, actionHandler: () => _context?.dispatch({type: "OPEN_ALERT", payload: null }) },
    ]
    
    
    return (
        <div className="w-full flex items-center justify-between py-2">
            <div className="flex space-x-4 px-2">
                {
                    toolbarOptions.map((item, index) => (
                        <>
                        {
                            item.show &&
                            <div className="flex items-center gap-3 border-[0.5px] px-3 py-2 rounded-md cursor-pointer" key={index} onClick={item?.actionHandler}>
                                <item.icon className="size-4"/>
                                <div className="flex items-center space-x-1">
                                    <p className="text-xs">{item.name}</p>
                                    { item.name == "Delete" && item.show && <p className="text-xs font-bold">{`(${selectedRows.length})`}</p>}
                                </div>
                            </div>
                        }
                        </>
                        
                    ))
                }
            </div>
            <div className="flex items-center space-x-5">
                <div className="relative h-10">
                    <Input className="relative h-10 max-w-[500px] text-sm" placeholder="Search ..." value={globalSearch} onChange={e => setGlobalSearch(e.target.value)} />
                    <div className="absolute right-3 top-3">
                        <Search className="size-4" />
                    </div>
                </div>
                {/* <DataTableFilter /> */}
                <DataTableDynamicFilter />
                <div>
                    <Button onClick={() => _context?.dispatch({ type: "SET_FORM_STATE", payload: { isFormOpen: true }})}>
                        <Plus className="size-4"/>
                        <span className="font-semibold text-xs">Add New</span>
                    </Button>
                </div>
            </div>
    </div>
    )
}