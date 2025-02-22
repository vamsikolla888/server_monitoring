import { z } from "zod";
import path from "path";
import configWindowsFileServerService from "../services/configWindowsFileServer.service";

export const createConfigDocumentSchema = z.object({
  serverName: z.string().min(1, "server is Required"),
  serverIpAddress: z.string().min(1, "ipAddress is Required"),
  baseFolder: z.string()
              .min(1, "baseFolder is Required")
              .refine(configWindowsFileServerService.checkDirectoryExists, "Invalid base folder")
              .transform(baseFolder => path.join(baseFolder))
})

export const paramValidation = z.object({
  configDocumentId: z.string().min(24, "configDocumentId is Required"),
})
export const updateConfigDocumentSchema = z.object({
  _id: z.string().min(24, "configDocumentId is Required"),
  serverName: z.string().min(1, 'server name is required'),
  serverIpAddress: z.string().min(1, "server ip address is required"),
  baseFolder: z.string()
              .min(1, "base folder path is required")
              .refine(configWindowsFileServerService.checkDirectoryExists, "base folder is exists")
              .transform(baseFolder => path.join(baseFolder))
})

