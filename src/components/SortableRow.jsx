import { useSelector } from 'react-redux';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import CellRenderer from './CellRender';
import { MdOutlineDeleteOutline } from 'react-icons/md';

const SortableRow = ({ row: initialRow, columns, onCellChange, onDeleteRow, onEditRow }) => {
  const row = useSelector((state) =>
    state.table.rows.find(r => r.id === initialRow.id)
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (!row) return null; // row might be undefined briefly

  return (
    <tr ref={setNodeRef} style={style}>
      <td className="border p-2 cursor-move" {...attributes} {...listeners}>
        <span className="text-gray-400">⠿</span>
      </td>

      {columns.map((col, index) => (
        <td key={col.id} className="border p-2">
          {index === 0 ? (
            <div
              onClick={() => onEditRow()}
              className="cursor-pointer hover:underline"
            >
              <CellRenderer
                type={col.type || 'text'}
                value={row.cells[col.id] || ''}
                options={col.options || []}
                onChange={(val) => onCellChange(row.id, col.id, val)}
              />
            </div>
          ) : (
            <CellRenderer
              type={col.type || 'text'}
              value={row.cells[col.id] || ''}
              options={col.options || []}
              onChange={(val) => onCellChange(row.id, col.id, val)}
            />
          )}
        </td>
      ))}

      <td className="border p-2 text-center">
        <button
          onClick={onDeleteRow}
          className="text-red-500 text-xl cursor-pointer"
        >
          <MdOutlineDeleteOutline className="text-red-600 hover:underline" />
        </button>
      </td>
    </tr>
  );
};

export default SortableRow;
