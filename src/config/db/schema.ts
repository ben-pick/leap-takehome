import { relations } from "drizzle-orm";
import { integer, text, pgTable, serial } from "drizzle-orm/pg-core";

export const prompt = pgTable("prompt", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
});

export const promptRelations = relations(prompt, ({ many }) => ({
  responses: many(response),
}));

export const response = pgTable("response", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  response: text("response").notNull(),
  promptId: integer("prompt_id"),
});

export const responseRelations = relations(response, ({ one }) => ({
  prompt: one(prompt, {
    fields: [response.promptId],
    references: [prompt.id],
  }),
}));
