import { z } from "zod";

export const multiDeleteSchema = z.object({
  selectedIds: z
    .array(
      z.string({
        required_error: "Selected IDs are required",
        invalid_type_error: "Selected IDs must be strings"
      })
      .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
        message: "Invalid ID format"
      })
    )
    .min(1, "At least one ID must be selected")
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "Duplicate IDs are not allowed"
    )
});
