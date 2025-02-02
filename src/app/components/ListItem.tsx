"use client"
import { useState } from "react";
import StaticListItem from "./StaticListItem";
import EditingListItem from "./EditingListItem";

type ListItemProps = {
  title: string;
  description: string;
  id: number;
};

export default function ListItem(props: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 w-full">
        {isEditing ? <EditingListItem {...props} setIsEditing={setIsEditing}>
            </EditingListItem>  : <StaticListItem {...props} setIsEditing={setIsEditing}></StaticListItem>}
    </div>
  );
}
