import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    { id: nanoid(), name: "Name", type: "text", options: [] },
    { id: nanoid(), name: "Desc", type: "text", options: [] },
    { id: nanoid(), name: "Assignee", type: "text", options: [] },
    { id: nanoid(), name: "Status", type: "select", options: ["Open", "Closed", "In Progress"] },
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
  const newRow = { id: nanoid(), cells: {} };
  state.columns.forEach(col => {
    newRow.cells[col.id] = "";
  });
  state.rows.push(newRow);
},
    deleteRow: (state, action) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    updateCell: (state, action) => {
  const { rowId, colId, value } = action.payload;
  const rowIndex = state.rows.findIndex(r => r.id === rowId);
  if (rowIndex !== -1) {
    const updatedRow = {
      ...state.rows[rowIndex],
      cells: {
        ...state.rows[rowIndex].cells,
        [colId]: value,
      },
    };
    state.rows[rowIndex] = updatedRow;
  }
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
  updateColumnOptions: (state, action) => {
    const { columnId, options } = action.payload;
    const column = state.columns.find(col => col.id === columnId);
    if (column) {
      column.options = options;
    }
  },
  updateColumnType: (state, action) => {
  const { columnId, newType, options = [] } = action.payload;
  const column = state.columns.find(col => col.id === columnId);
  if (column) {
    column.type = newType;
    column.options = newType === "select" ? options : [];
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
