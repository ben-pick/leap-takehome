"use server";

import { promptLlm } from "../repositories/llm";
import {
  deletePrompts,
  deleteResponse,
  getActivePrompt,
  getPrompts,
  insertPrompt,
  updateResponse,
} from "../repositories/prompt";
import { revalidatePath } from "next/cache";
import { editResponseSchema } from "../schemas/response";
import { ZodError } from "zod";

export async function sendPrompt(formData: FormData) {
  try {
    const content = formData.get("content") as string;
    if (content && content.length) {
      const prompts = await getPrompts();
      const responses = await promptLlm(content, prompts);
      if (responses.length) {
        await insertPrompt({ prompt: content }, responses);
        revalidatePath("/home");
        return { message: "Prompt queried successfully", success: true };
      }
    }
    return { message: "Failed to send prompt", success: false };
  } catch (e) {
    console.error(e);
    return { message: "Failed to send prompt", success: false };
  }
}

export async function removeResponse(responseId: number) {
  try {
    const prompt = await getActivePrompt();
    if (!prompt?.responses.find((r) => r.id === responseId)) {
      return { message: "Failed to remove response", success: false };
    }
    if (prompt.responses.length == 1) {
      // Delete history when no more list
      await deletePrompts();
    } else {
      await deleteResponse(responseId);
    }
    revalidatePath("/home");
    return { message: "Removed response successfully", success: true };
  } catch (e) {
    console.error(e);
    return { message: "Failed to remove response", success: false };
  }
}

export async function editResponse(responseId: number, formData: FormData) {
  try {
    await updateResponse(
      responseId,
      editResponseSchema.parse(Object.fromEntries(formData))
    );
    revalidatePath("/home");
    return { message: "Updated successfully", success: true };
  } catch (e) {
    console.error(e);
    if (e instanceof ZodError) {
      const { issues } = e;
      if (issues.length) {
        return {
          message: issues.map((i) => i.message).join("\n"),
          success: false,
        };
      }
    }
    return { message: "Failed to update", success: false };
  }
}

export async function restartPrompt() {
  try {
    await deletePrompts();
    revalidatePath("/home");
    return { message: "Restarted successfully", success: true };
  } catch (e) {
    console.error(e);
    return { message: "Failed to restart", success: false };
  }
}
