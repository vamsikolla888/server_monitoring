interface ICustomFormField {
    label: string;
    type: "text" | "number" | "select",
    name: string;
    placeholder: string;
    value?: any; 
    width?: number;
    className?: string;
    order?: number;
    required?: boolean;
    displayInAddForm: boolean;
    displayInEditForm: boolean;
    defaultValue?: any;
}