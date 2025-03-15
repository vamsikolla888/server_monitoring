import { z } from "zod";

export const schema = z.object({
    email: z.string().email("Enter valid email"),
    password: z.string().min(8, "Enter password with 8 letter minimum")
})

export type LoginBodyType = z.infer<typeof schema>;

export const defaultvalues = {
    email: "",
    password: "",
}