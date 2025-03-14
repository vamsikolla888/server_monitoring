import { ColumnBodyOptions } from "primereact/column";
import moment from "moment"
import { ITableContext, ITableField } from "../types";
import { Edit, Trash } from "lucide-react";
import { useContext } from "react";
import { TableContext } from "../context/TableProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface DefaultColumnProps {
	data: any;
	options: ColumnBodyOptions;
	column: ITableField;
}



const Actions = ({ data, options, column }: DefaultColumnProps) => {
  const { dispatch, state } = useContext(TableContext) as ITableContext;

  const deleteHandler = (rowData: any) => {
    dispatch({ type: "SET_SELECTED_ROWS", payload: { selectedRows: [rowData]}})
    dispatch({ type: "OPEN_ALERT", payload: null})
  }

	return (
		<div className="flex items-center space-x-2">
			<button className="text-blue-500 hover:text-blue-700" onClick={() => dispatch({ type: "SET_ROW_DATA", payload: { data, isEdit: true, isFormOpen: true }})}>
				<Edit className="w-4 h-4" />
			</button>
			<button className="text-red-500 hover:text-red-700" onClick={() => deleteHandler(data)}>
				<Trash className="w-4 h-4" />
			</button>
		</div>
	);
};

const DefaultStyle = ({ data, options, column }: DefaultColumnProps) => {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
            {column.fieldExtractor ? column.fieldExtractor(data,column) : data?.[column.field] ?? ""}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          {column.fieldExtractor ? column.fieldExtractor(data,column) : data?.[column.field] ?? ""}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const DateStyle = ({ data, options, column }: DefaultColumnProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer">
            {column.fieldExtractor ? column.fieldExtractor(data,column) : moment(data?.[column.field]).format("DD-MM-YYYY") ?? ""}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          {column.fieldExtractor ? column.fieldExtractor(data,column) :  moment(data?.[column.field]).format("DD-MM-YYYY") ?? ""}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}



export default function getColumnBodyStyles(data:any, options: ColumnBodyOptions, column: ITableField) {
    switch(column.customStyle) {
      case "Actions":
        return <Actions data={data} options={options} column={column} />;
      case "Date":
        return <DateStyle data={data} options={options} column={column} />;
      default:
        return <DefaultStyle data={data} options={options} column={column} />;
  }
}

