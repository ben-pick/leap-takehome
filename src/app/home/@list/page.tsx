import { getActivePrompt } from "@/app/repositories/prompt";
import List from "@/app/components/List";

export default async function Page() {
  const prompt = await getActivePrompt();

  return prompt && prompt.responses.length ? (
    <List
      items={
        prompt.responses.map((r) => {
          return {
            title: r.title,
            id: r.id,
            description: r.response,
          };
        }) ?? []
      }
    ></List>
  ) : (
    <h1 className="text-3xl grow flex items-center justify-center">
      No responses yet. Type in a prompt and hit enter!
    </h1>
  );
}
