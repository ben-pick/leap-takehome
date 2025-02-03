"use client";
import { restartPrompt, sendPrompt } from "@/app/actions/prompt";
import ErrorAlert from "@/app/components/ErrorAlert";
import { RestartIcon, SendIcon, SpinnerIcon } from "@/app/components/Icon";
import Input from "@/app/components/Input";
import { useActionState } from "react";
export default function PromptInput() {
  const [sendState, sendPromptFormAction, sendPending] = useActionState(
    (_prevState: { message: string; success: boolean }, formData: FormData) =>
      sendPrompt(formData),
    {
      message: "",
      success: true,
    }
  );

  const [restartState, restartPromptFormAction, restartPending] = useActionState(
    () =>
      restartPrompt(),
    {
      message: "",
      success: true,
    }
  );

  
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <form action={restartPromptFormAction}>
          <button type="submit">
            {restartPending ? <SpinnerIcon width={6} height={6} /> : <RestartIcon />}
          </button>
        </form>
        <form action={sendPromptFormAction} className="flex gap-2 items-center grow">
          <div className="grow">
            <Input
              placeholder="Enter your prompt"
              name="content"
              disabled={sendPending}
            />
          </div>
          <button type="submit">
            {sendPending ? <SpinnerIcon width={6} height={6} /> : <SendIcon />}
          </button>
        </form>
      </div>
      {!sendState.success && <ErrorAlert message={sendState.message} />}
      {!restartState.success && <ErrorAlert message={restartState.message} />}

    </div>
  );
}
