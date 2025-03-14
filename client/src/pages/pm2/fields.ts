import { ITableField } from "@/components/custom/tables/types";
  /**@TableFields */
export const tableFields: ITableField[] = [
    { name: "ID", field: "pm_id", header: "ID", filter: false, sortable: false, displayInTable: true },
    { name: "Name", field: "name", header: "Name", filter: false, sortable: false, displayInTable: true },
    { name: "Process ID", field: "pid", header: "Process ID", filter: false, sortable: false, displayInTable: true },
    { name: "Mode", field:"exec_mode", header: "Mode", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["pm2_env"]?.[column.field] ?? "" },
    { name: "Cpu", field: "cpu", header: "Cpu", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["monit"]?.[column.field] ?? "" },
    { name: "Memory", field: "memory", header: "Memory", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["monit"]?.[column.field] ?? "" },
    { name: "User", field: "USERNAME", header: "User", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["pm2_env"]?.[column.field] ?? "" },
    { name: "Status", field: "status", header: "Status", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["pm2_env"]?.[column.field] ?? ""},
    { name: "Node Version", field: "node_version", header: "Node Version", filter: false, sortable: false, displayInTable: true, fieldExtractor: (data, column) => data?.["pm2_env"]?.[column.field]}
    // { name: "Checkbox", field:"", header: "", extraProps: { selectionMode: "multiple", headerStyle: { width: '3rem' } }, filter: false, sortable: false, displayInTable: true, propKeys: [], noProps: true},
    // { name: 'Server Name', field: 'serverName', header: 'Server Name', filter: true, sortable: true, displayInTable: true  },
    // { name: 'Server IP Address', field: 'serverIpAddress', header: 'Server IP Address', filter: true, sortable: true, displayInTable: true  },
    // { name: 'Base Folder', field: 'baseFolder', header: 'Base Folder', filter: true, sortable: true, displayInTable: true },
    // { name: 'created', field: 'created', header: 'Created', filter: false, sortable: true, displayInTable: true },
    // { name: 'actions', field: 'actions', header: 'Actions', filter: false, sortable: true, displayInTable: true, customStyle: "Actions" },
];