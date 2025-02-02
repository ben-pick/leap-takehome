import { z } from "zod";

export const editResponseSchema = z.object({
  content: z.string().min(1, { message: "Content is empty" }),
  title: z.string().min(1, { message: "Title is empty" }),
});
