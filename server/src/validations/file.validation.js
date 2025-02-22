import { z } from "zod";

export const fileCreateSchema = z.object({
  name: z.string().min(1, "File name is required"),
  filePath: z.string().min(1, "File path is required"),
})

