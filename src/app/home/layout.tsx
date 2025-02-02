export default function Layout({
  chatbox,
  list,
}: {
  chatbox: React.ReactNode
  list: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full">
        <div className="flex flex-col grow gap-4 p-4 justify-between">
                {list}
                {chatbox}
            </div>
    </div>
  )
}
