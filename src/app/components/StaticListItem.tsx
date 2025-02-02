"use client";
import { useActionState } from "react";
import { DeleteIcon, EditIcon, SpinnerIcon } from "./Icon";
import { removeResponse } from "../actions/prompt";
import ErrorAlert from "./ErrorAlert";

type StaticListItemProps = {
  title: string;
  description: string;
  id: number;
  setIsEditing: (isEditing: boolean) => void;
};

export default function StaticListItem({
  title,
  description,
  id,
  setIsEditing,
}: StaticListItemProps) {
  const [state, formAction, pending] = useActionState(
    () => removeResponse(id),
    {
      message: "",
      success: true,
    },
  );

  return (
    <div>
      <div className="flex gap-2">
        <h5 className="grow mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <div>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={pending}
          >
            <EditIcon />
          </button>
        </div>
        <form action={formAction}>
          <button type="submit" disabled={pending}>
            {pending ? <SpinnerIcon height={6} width={6} /> : <DeleteIcon />}
          </button>
        </form>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      {!state.success && <ErrorAlert message={state.message} />}
    </div>
  );
}
