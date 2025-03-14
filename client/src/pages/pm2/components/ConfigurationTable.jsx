import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ConfigurationForm from "./ConfigurationForm";
import { EllipsisVertical, ChevronUp, ChevronDown } from "lucide-react";
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CommonPaginator from "@/common/paginator/CommonPaginator";
import TableWrapper from "@/components/custom/tables/context/TableProvider";

export default function ConfigurationTable({ tableFields, results = [] }) {
    // Custom sort icon template
    const getSortIcon = ({Icon, ...field}) => (
        <div className="flex gap-2 items-center">
            { Icon && <Icon className="size-4"/>}
            {field.header}
            <span className="sort-icons flex flex-col">
                <ChevronUp className="w-3 h-3" />
                <ChevronDown className="w-3 h-3 -mt-1" />
            </span>
        </div>
    );

    return (
      <div className="w-full h-full">
        <p className="font-bold text-lg pb-5 px-3 text-neutral-700">Configurations</p>
        <div className="flex justify-between space-x-4"> 
            <Card>
                <CardContent className="p-0">
                    {/* <DataTable
                        value={results}
                        resizableColumns
                        columnResizeMode="expand"
                        scrollable
                        stripedRows
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        selectionMode="checkbox"
                        filterIcon={() => <EllipsisVertical className="size-4" strokeWidth={1.5}/>}
                        className="p-datatable-custom shadow-lg"
                        showGridlines
                        emptyMessage="No records found"
                        rowHover
                        sortMode="single"
                        removableSort
                        reorderableColumns
                        style={{ maxWidth: "100%"}}
                        
                        
                        >
                        {tableFields.map((field) => (
                            <Column
                                key={field.name}
                                field={field.searchKey}
                                header={getSortIcon(field)}
                                sortable
                                filter
                                // style={{ 
                                //     minWidth: field.minWidth || '150px',
                                //     maxWidth: field.maxWidth || '' 
                                // }}
                                headerClassName="bg-white text-slate-700 text-sm font-semibold px-4 py-2 dark:bg-boxdark dark:text-white column__header"
                                bodyClassName="text-slate-600 dark:text-slate-200 px-4 py-3 text-sm"
                                filterPlaceholder={`Search ${field.header}`}
                                filterMatchMode="contains"
                                showFilterMatchModes={false}
                                showFilterMenuOptions={false}
                                showApplyButton={false}
                                showClearButton={false}
                                filterMenuClassName="shadow border-slate-200 border-[1px] max-w-[300px]"
                            />
                        ))}
                    </DataTable> */}
                    <TableWrapper results={results} tableFields={tableFields} />
                    <CommonPaginator />
                </CardContent>
            </Card>
            <div className="w-[30%]">
                <Card>
                    <CardHeader>Create Configuration</CardHeader>
                    <CardContent>
                        <ConfigurationForm />
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    );
}

// PropTypes validation
ConfigurationTable.propTypes = {
    tableFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        searchKey: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        type: PropTypes.string,
        minWidth: PropTypes.string,
        maxWidth: PropTypes.string
    })).isRequired,
    results: PropTypes.array
};
ConfigurationTable.displayName = 'ConfigurationTable';