import { ChevronsLeftRightEllipsis, Navigation,  } from "lucide-react"; 
  /**@TableFields */
export const tableFields = [
    { name: 'Server Name', searchKey: 'serverName', header: 'Server Name' },
    { name: 'Server IP Address', searchKey: 'serverIpAddress', header: 'Server IP Address', Icon: ChevronsLeftRightEllipsis },
    { name: 'Base Folder', searchKey: 'baseFolder', header: 'Base Folder', type: 'Base Folder', Icon: Navigation  },
    { name: 'created', searchKey: 'created', header: 'Created' },
];

// export const formFields = [
//   { name: 'serverName', searchKey: 'serverName', header: 'Server Name', placeholder: "Enter server name", required: true },
//   { name: 'serverIpAddress', searchKey: 'serverIpAddress', header: 'Server IP Address', placeholder: "Enter server ip address", required: true },
//   { name: 'baseFolder', searchKey: 'baseFolder', header: 'Base Folder', type: 'Base Folder', placeholder: "Enter Base Folder path", required: true },
// ]

export const formFields: ICustomFormField[] = [
  {name: "serverName", label: "Server Name", placeholder: "Enter server name", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "serverIpAddress", label: "Server IP Address", placeholder: "Enter Server IP Address", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "baseFolder", label: "Base Folder", placeholder: "Enter Base Folder", type: "text", displayInAddForm: true, displayInEditForm: true },
]