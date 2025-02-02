import { SpinnerIcon } from "@/app/components/Icon";

export default function Loading() {
  return (
    <div className="grow flex items-center justify-center ">
      <SpinnerIcon height={24} width={24}></SpinnerIcon>
    </div>
  );
}
