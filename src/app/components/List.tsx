import ListItem from "./ListItem";

type ListProps = {
  items: {
    title: string;
    description: string;
    id: number;
  }[];
};
export default function List({ items }: ListProps) {
  return (
    <div className="flex-col flex gap-4 overflow-auto">
      {items.map((item) => {
        return <ListItem key={item.id} {...item}></ListItem>;
      })}
    </div>
  );
}
