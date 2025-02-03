import { prompt, response } from "@/config/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type NewReponse = InferInsertModel<typeof response>;
export type NewPrompt = InferInsertModel<typeof prompt>;
export type ExistingResponse = InferSelectModel<typeof response>;

export type ExistingPrompt = InferSelectModel<typeof prompt> & {
  responses: ExistingResponse[];
};
