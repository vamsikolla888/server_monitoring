import { ICustomFormField } from "@/components/custom/form/types";
import { ITableField } from "@/components/custom/tables/types";
  /**@TableFields */
export const tableFields: ITableField[] = [
    { name: "Checkbox", field:"", header: "", extraProps: { selectionMode: "multiple", headerStyle: { width: '3rem' } }, filter: false, sortable: false, displayInTable: true, propKeys: [], noProps: true},
    { name: 'Server Name', field: 'serverName', header: 'Server Name', filter: true, sortable: true, displayInTable: true  },
    { name: 'Server IP Address', field: 'serverIpAddress', header: 'Server IP Address', filter: true, sortable: true, displayInTable: true  },
    { name: 'Base Folder', field: 'baseFolder', header: 'Base Folder', filter: true, sortable: true, displayInTable: true },
    { name: 'created', field: 'created', header: 'Created', filter: false, sortable: true, displayInTable: true, customStyle: "Date" },
    { name: 'actions', field: 'actions', header: 'Actions', filter: false, sortable: true, displayInTable: true, customStyle: "Actions" },
];

export const formFields: ICustomFormField[] = [
  {name: "serverName", label: "Server Name", placeholder: "Enter server name", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "serverIpAddress", label: "Server IP Address", placeholder: "Enter Server IP Address", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "baseFolder", label: "Base Folder", placeholder: "Enter Base Folder", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "options", label: "Options", placeholder: "Enter your option", type: "combobox", displayInAddForm: true, displayInEditForm: true, options: [{ label: "USA", value: "usa"}, { label: "INDIA", value: "india"}, { label: "CANADA", value: "canada"}]}
]

export const tableFilterFields: ICustomFormField[] = [
  { name: "serverName", placeholder: "Server Name", label: "Server Name", type: "text", displayInAddForm: false, displayInEditForm: false, className: "h-9 text-xs" },
  { name: "serverIpAddress", placeholder: "Server IP Address", label: "Server IP Address", type: "text", displayInAddForm: false, displayInEditForm: false, className: "h-9 text-xs" },
  { name: "baseFolder", placeholder: "Base Folder", label: "Base Folder", type: "text", displayInAddForm: false, displayInEditForm: false, className: "h-9 text-xs" },
]