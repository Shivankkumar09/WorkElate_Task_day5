import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    { id: nanoid(), name: "Column_1", type: "text", options: [] },
    { id: nanoid(), name: "Column_2", type: "text", options: [] },
  ],
  rows: [
    { id: nanoid(), cells: {} },
  ],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addColumn: (state) => {
      state.columns.push({ id: nanoid(), name: `Column ${state.columns.length + 1}` });
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter(col => col.id !== action.payload);
      state.rows.forEach(row => delete row.cells[action.payload]);
    },
    renameColumn: (state, action) => {
      const { id, name } = action.payload;
      const col = state.columns.find(c => c.id === id);
      if (col) col.name = name;
    },
    addRow: (state) => {
      state.rows.push({ id: nanoid(), cells: {} });
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    updateCell: (state, action) => {
      const { rowId, colId, value } = action.payload;
      const row = state.rows.find(r => r.id === rowId);
      if (row) row.cells[colId] = value;
    },
    setColumnsOrder: (state, action) => {
  state.columns = action.payload;
},
setRowsOrder: (state, action) => {
  state.rows = action.payload;
},
changeColumnType: (state, action) => {
  const { id, newType, options = [] } = action.payload;
  const column = state.columns.find(col => col.id === id);
  if (column) {
    column.type = newType;
    column.options = options;
  }
},
updateColumnType: (state, action) => {
    const { columnId, type } = action.payload;
    const column = state.columns.find(col => col.id === columnId);
    if (column) {
      column.type = type;
      if (type !== 'select') {
        column.options = []; // clear options for non-select types
      }
    }
  },
  updateColumnOptions: (state, action) => {
    const { columnId, options } = action.payload;
    const column = state.columns.find(col => col.id === columnId);
    if (column) {
      column.options = options;
    }
  },
  }
});

export const {
  addColumn, deleteColumn, renameColumn,
  addRow, deleteRow, updateCell, setColumnsOrder, setRowsOrder, changeColumnType,
  updateColumnType, updateColumnOptions
} = tableSlice.actions;

export default tableSlice.reducer;
