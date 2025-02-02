import { huggingFace } from "@/config/llm/huggingFace";
import { NewReponse } from "../types/prompt";

export async function promptLlm(content: string): Promise<NewReponse[]> {
  const contentWithInstructions = `You are a tool used to create insights based on user inputs. You must format the response into a list of insights. Each list item have a title to summarise the insight, followed by a concise description of that insight. Each list item should follow the format for example: *TITLE*: DESCRIPTION. Do not try to use sublist with the same syntax. Each list item should be seperated by a newline. Only include the list and no other text before or after. The input is: ${content}`;
  const res = await huggingFace.chatCompletion({
    model: process.env.MODEL!,
    messages: [{ role: "user", content: contentWithInstructions }],
    max_tokens: process.env.MAX_TOKENS!,
  });

  if (!res.choices[0].message.content) {
    throw new Error("Failed to get response content");
  }

  const lines = res.choices[0].message.content
    .split("\n")
    .filter((s) => s.length);
  const regExp = /\*(.*)\*: (.*)/g;

  const matches = lines
    .map((line) => [...line.matchAll(regExp)])
    .filter((m) => m.length && m[0].length == 3)
    .map((m) => m[0]);

  const completeMatches =
    res.choices[0].finish_reason == "length" ? matches.slice(0, -1) : matches;

  return (
    completeMatches?.map((m) => {
      return {
        response: m[2],
        title: m[1],
      };
    }) ?? []
  );
}
