import { ICustomFormField } from "@/components/custom/form/types";

export const formFields: ICustomFormField[] = [
  {name: "email", label: "Email", placeholder: "Enter your email", type: "text", displayInAddForm: true, displayInEditForm: true },
  {name: "password", label: "Password", placeholder: "Enter your password", type: "text", displayInAddForm: true, displayInEditForm: true, },
  {name: "remember", label: "Remember me", placeholder: "Enter server name", type: "checkbox", displayInAddForm: true, displayInEditForm: true, options: [{ label: "Remember me", value: "remember"}], showLabel: false, className: "py-4" },
]