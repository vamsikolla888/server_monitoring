import { ICustomFormField } from "@/components/custom/form/types";

export const formFields: ICustomFormField[] = [
  {name: "firstName", label: "First Name", placeholder: "Enter your first name", type: "text", displayInAddForm: true, displayInEditForm: true,},
  {name: "lastName", label: "Last Name", placeholder: "Enter your last name", type: "text", displayInAddForm: true, displayInEditForm: true},
  {name: "email", label: "email", placeholder: "Enter your email", type: "text", displayInAddForm: true, displayInEditForm: true, },
  {name: "phone", label: "Phone", placeholder: "Enter your phone", type: "text", displayInAddForm: true, displayInEditForm: true, },
  {name: "password", label: "Password", placeholder: "Enter your password", type: "text", displayInAddForm: true, displayInEditForm: true, },
  {name: "confirmPassword", label: "Confirm Password", placeholder: "Enter your confirm password", type: "text", displayInAddForm: true, displayInEditForm: true, },

]