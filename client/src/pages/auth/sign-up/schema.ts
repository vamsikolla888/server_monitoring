import { z } from "zod";

export const schema = z.object({
    firstName: z.string().min(2, "Enter your first name"),
    lastName: z.string().min(2, "Enter your last name"),
    email: z.string().email("Enter valid email"),
    phone: z.string().max(10, "Enter valid phone"),
    password: z.string().min(8, "Enter password with 8 letter minimum"),
    confirmPassword: z.string().min(8, "Enter password with 8 letter minimum")

})

export type SignupBodyType = z.infer<typeof schema>;

export const defaultvalues = {
    email: "",
    password: "",
}