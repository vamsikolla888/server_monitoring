import { z } from "zod";

export const configurationSchema = z.object({ 
    serverName: z.string().min(1, "Server is Required"),
    serverIpAddress: z.string().min(1, "Server IP Address required"),
    baseFolder: z.string().min(1, "basefolder path is required")
})