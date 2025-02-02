"use client"
import { sendPrompt } from "@/app/actions/prompt";
import ErrorAlert from "@/app/components/ErrorAlert";
import { SendIcon, SpinnerIcon } from "@/app/components/Icon";
import Input from "@/app/components/Input";
import { useActionState } from "react";

export default function PromptInput() {
    const [state, formAction, pending] = useActionState((_prevState: {message: string, success:boolean}, formData: FormData) => sendPrompt(formData), {
        message: "",
        success: true
    })
    
  return (
    <form action={formAction}>
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
                <div className="grow">
                    <Input placeholder="Enter your prompt"
                    name="content" disabled={pending}/>
                </div>
                <button type="submit">
                    {pending ? <SpinnerIcon width={6} height={6}/> : <SendIcon/>} 
                </button>
                
            </div>
            {!state.success && <ErrorAlert message={state.message}/>}   
        </div>  
    </form>
  );
}
