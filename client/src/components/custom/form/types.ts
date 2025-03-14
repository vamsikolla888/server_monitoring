
interface BaseFormField {
    label: string;
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
    showLabel?: boolean;
}

interface OptionField extends BaseFormField {
    options: { label: string; value: string | number }[];
}

export interface TextField extends BaseFormField {
    type: "text";
    maxLength?: number;  
}

interface NumberField extends BaseFormField {
    type: "number";
    min?: number;
    max?: number;
    step?: number;
}

export interface SelectField extends OptionField {
    type: "select";
    multiple?: boolean;
}

export interface RadioField extends OptionField {
    type: "radio";
}
export interface SwitchField extends BaseFormField {
    type: "switch";
    id: string;
}

export interface MultiSelectField extends OptionField {
    type: "multi-select";
}

export interface CheckboxField extends OptionField {
    type: "checkbox";
}

export interface CalendarField extends BaseFormField {
    type: "calendar";
}

export interface TextAreaField extends BaseFormField {
    type: "textarea";
    rows: number;
}

export interface ComboBoxField extends OptionField {
    type: "combobox",
}
 export type ICustomFormField = TextField | NumberField | SelectField | RadioField | SwitchField | MultiSelectField | CheckboxField | CalendarField | TextAreaField | CustomCombobox;
