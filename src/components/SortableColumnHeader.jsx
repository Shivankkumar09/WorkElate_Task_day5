import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SortableColumnHeader = ({ column, onRename, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className="border p-2 bg-gray-100 cursor-move"
      {...attributes}
    >
      <div className="flex items-center gap-2">
        <span {...listeners}>⠿</span>
        <input
          value={column.name}
          onChange={(e) => onRename(e.target.value)}
          className="border-b focus:outline-none bg-transparent w-full"
        />
        <button
          onClick={onDelete}
          className="text-red-600 hover:underline  ml-2 cursor-pointer"
        >
          <MdOutlineDeleteOutline  className="text-red-600 hover:underline ml-2" />
        </button>
      </div>
    </th>
  );
};

export default SortableColumnHeader;
