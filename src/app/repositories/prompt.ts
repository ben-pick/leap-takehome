import { db } from "@/config/db/drizzle";
import { prompt, response } from "@/config/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { editResponseSchema } from "../schemas/response";
import { NewPrompt, NewReponse } from "../types/prompt";

export async function getPrompts() {
  return await db.query.prompt.findMany({
    with: {
      responses: true,
    },
  });
}
export async function getActivePrompt() {
  return await db.query.prompt.findFirst({
    with: {
      responses: true,
    },
    orderBy: [desc(prompt.id)],
  });
}

export async function insertPrompt(
  newPrompt: NewPrompt,
  newResponses: NewReponse[]
) {
  const result = await db
    .insert(prompt)
    .values(newPrompt)
    .returning({ promptId: prompt.id });

  await db.insert(response).values(
    newResponses.map((res) => {
      return {
        ...res,
        promptId: result[0].promptId,
      };
    })
  );
}

export async function deletePrompts() {
  // Remove this function to support prompt appending
  await db.delete(response);
  await db.delete(prompt);
}

export async function deleteResponse(responseId: number) {
  await db.delete(response).where(eq(response.id, responseId));
}

export async function updateResponse(
  responseId: number,
  update: z.infer<typeof editResponseSchema>
) {
  await db
    .update(response)
    .set({ response: update.content, title: update.title })
    .where(eq(response.id, responseId));
}
