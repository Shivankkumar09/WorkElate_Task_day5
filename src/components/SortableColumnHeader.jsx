import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdOutlineDeleteOutline } from "react-icons/md";

const SortableColumnHeader = ({ column, onRename, onDelete, onTypeChange }) => {
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

  const [localOptions, setLocalOptions] = useState(column.options?.join(", ") || "");

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const options = newType === "select" ? localOptions.split(",").map(o => o.trim()) : [];
    onTypeChange(newType, options);
  };

  const handleOptionsChange = (e) => {
    const val = e.target.value;
    setLocalOptions(val);
    const options = val.split(",").map(o => o.trim());
    onTypeChange(column.type, options);
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      className="border p-2 bg-gray-100 cursor-move"
      {...attributes}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span {...listeners}>⠿</span>
          <input
            value={column.name}
            onChange={(e) => onRename(e.target.value)}
            className="border-b focus:outline-none bg-transparent w-full"
          />
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline ml-2 cursor-pointer"
          >
            <MdOutlineDeleteOutline />
          </button>
        </div>

        <select
          value={column.type || "text"}
          onChange={handleTypeChange}
          className="border rounded px-1 py-0.5 text-sm"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="select">Select</option>
        </select>

        {column.type === "select" && (
          <input
            type="text"
            placeholder="Option1, Option2"
            className="border rounded px-1 py-0.5 text-sm"
            value={localOptions}
            onChange={handleOptionsChange}
          />
        )}
      </div>
    </th>
  );
};

export default SortableColumnHeader;
