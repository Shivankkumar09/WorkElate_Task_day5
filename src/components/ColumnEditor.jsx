import { useDispatch } from 'react-redux';
import { updateColumnType, updateColumnOptions } from '../store/TableSlice';

const ColumnEditor = ({ column }) => {
  const dispatch = useDispatch();

  const handleTypeChange = (e) => {
    dispatch(updateColumnType({ columnId: column.id, type: e.target.value }));
  };

  const handleOptionsChange = (e) => {
    const options = e.target.value.split(',').map(opt => opt.trim());
    dispatch(updateColumnOptions({ columnId: column.id, options }));
  };

  return (
    <div className="space-y-2">
      <label>Field Type</label>
      <select value={column.type} onChange={handleTypeChange}>
        <option value="text">Text</option>
        <option value="select">Select</option>
        <option value="number">Number</option>
      </select>

      {column.type === 'select' && (
        <>
          <label>Options (comma separated)</label>
          <input
            type="text"
            placeholder="Option1, Option2"
            onChange={handleOptionsChange}
            value={column.options.join(', ')}
          />
        </>
      )}
    </div>
  );
};

export default ColumnEditor;