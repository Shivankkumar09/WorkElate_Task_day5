import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CellRenderer from './CellRender';



const SortableRow = ({ row, columns, onCellChange, onDeleteRow }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      {/* Drag handle */}
      <td className="border p-2 cursor-move" {...attributes} {...listeners}>
        <span className="text-gray-400">⠿</span>
      </td>

      {/* Data cells */}
      {columns.map(col => (
        <td key={col.id} className="border p-2">
          <CellRenderer
            type={col.type || 'text'}
            value={row.cells[col.id] || ''}
            options={col.options || []}
            onChange={val => onCellChange(row.id, col.id, val)}
          />
        </td>
      ))}

      
      <td className="border p-2 text-center">
        <button onClick={onDeleteRow} className="text-red-500 text-sm">Delete_row</button>
      </td>
    </tr>
  );
};

export default SortableRow;
