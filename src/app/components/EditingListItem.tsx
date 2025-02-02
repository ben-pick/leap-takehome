"use client"
import { useActionState, useRef } from "react";
import { CancelIcon,  SaveIcon, SpinnerIcon } from "./Icon";
import { editResponse } from "../actions/prompt";
import Input from "./Input";
import Textarea from "./Textarea";
import ErrorAlert from "./ErrorAlert";

type ListItemProps = {
  title: string;
  description: string;
  id: number;
  setIsEditing: (isEditing: boolean) => void;
};

export default function EditingListItem({ title, description, id, setIsEditing }: ListItemProps) {
    const ref = useRef<HTMLFormElement>(null)
    const [state, formAction, pending] = useActionState( async (_prevState: {message: string, success:boolean}, formData:FormData) => {
        const res = await editResponse(id, formData)
        setIsEditing(false);
        return res
     }, {
        message: "",
        success: false
    })

  return (
      <form action={formAction} ref={ref} >
        <div className="flex flex-col gap-2">
        <div className="flex gap-2">
            <div className="flex flex-col gap-2 grow">
            <Input disabled={pending} defaultValue={title} name="title"/>
            <Textarea disabled={pending} defaultValue={description}  name="content"/>
            </div>
            <div className="flex items-start gap-2">
                <button type="submit" disabled={pending}> 
                {pending ? <SpinnerIcon height={6} width={6}/>: <SaveIcon />}
                </button>
                <button type="button" disabled={pending} onClick={() => setIsEditing(false)}> 
                <CancelIcon />
                </button>
            </div>
            
        </div>
        {!state.success && state.message &&  <ErrorAlert message={state.message}/>}
        </div>
      </form>
  );
}
