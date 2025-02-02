import { getPrompt } from "@/app/repositories/prompt";
import List from "@/app/components/List";

export default async function Page() {
    const prompts = await getPrompt();
    const responses = prompts.flatMap(p => p.responses)
    
  return (
            responses.length ? <List items={responses.map(
                r => {
                    return {
                        title: r.title,
                        id: r.id,
                        description: r.response
                    }
                }
            ) ?? []}>  
            </List> : <h1 className="text-3xl grow flex items-center justify-center">
                No responses yet. Type in a prompt and hit enter!
            </h1>
  );
}
