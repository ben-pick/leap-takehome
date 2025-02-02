import { prompt, response } from "@/config/db/schema";
import { InferInsertModel } from "drizzle-orm";

export type NewReponse = InferInsertModel<typeof response>;
export type NewPrompt = InferInsertModel<typeof prompt>;
