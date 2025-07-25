import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSelector, useDispatch } from "react-redux";
import {
  addColumn,
  deleteColumn,
  renameColumn,
  addRow,
  deleteRow,
  updateCell,
  setRowsOrder,
  setColumnsOrder,
  changeColumnType,
} from "../store/TableSlice";

import SortableRow from "./SortableRow";
import SortableColumnHeader from "./SortableColumnHeader";
import Modal from "./Modal";

const TableGrid = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.table.columns);
  const rows = useSelector((state) => state.table.rows);

  const [editingRow, setEditingRow] = useState(null);

  const handleCellChange = (rowId, colId, value) => {
    dispatch(updateCell({ rowId, colId, value }));
  };

  const handleRowDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);

    const updatedRows = [...rows];
    const [movedRow] = updatedRows.splice(oldIndex, 1);
    updatedRows.splice(newIndex, 0, movedRow);

    dispatch(setRowsOrder(updatedRows));
  };

  const handleColumnDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((col) => col.id === active.id);
    const newIndex = columns.findIndex((col) => col.id === over.id);

    const updatedCols = [...columns];
    const [movedCol] = updatedCols.splice(oldIndex, 1);
    updatedCols.splice(newIndex, 0, movedCol);

    dispatch(setColumnsOrder(updatedCols));
  };

const handleSaveModal = (updatedFields) => {
  if (!editingRow) return;

  columns.forEach((col) => {
    const newValue = updatedFields[col.id];
    const prevValue = editingRow.cells[col.id];

    if (newValue !== prevValue) {
      console.log(`Updating row ${editingRow.id}, col ${col.id}: ${prevValue} => ${newValue}`);
      dispatch(updateCell({ rowId: editingRow.id, colId: col.id, value: newValue }));
    }
  });

  setEditingRow(null);
};

const getInitialDataForRow = (row) => {
  const data = {};
  for (const col of columns) {
    data[col.id] = row.cells[col.id] || ""; 
  }
  return data;
};


  return (
    <div className="p-4">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => dispatch(addColumn())}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Column
        </button>
        <button
          onClick={() => dispatch(addRow())}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Row
        </button>
      </div>

      <table className="w-full border border-collapse">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleColumnDragEnd}>
          <SortableContext items={columns.map((col) => col.id)} strategy={horizontalListSortingStrategy}>
            <thead>
              <tr>
                <th className="border p-2 bg-gray-100 w-8"></th>
                {columns.map((col) => (
                  <SortableColumnHeader
                    key={col.id}
                    column={col}
                    onRename={(val) => dispatch(renameColumn({ id: col.id, name: val }))}
                    onDelete={() => dispatch(deleteColumn(col.id))}
                    onTypeChange={(newType, options) =>
                      dispatch(changeColumnType({ id: col.id, newType, options }))
                    }
                  />
                ))}
              </tr>
            </thead>
          </SortableContext>
        </DndContext>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleRowDragEnd}>
          <SortableContext items={rows.map((r) => r.id)} strategy={verticalListSortingStrategy}>
            <tbody>
              {rows.map((row) => (
                <SortableRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  onCellChange={handleCellChange}
                  onDeleteRow={() => dispatch(deleteRow(row.id))}
                  onEditRow={() => setEditingRow(row)} // 👈 Hook into modal open
                />
              ))}
            </tbody>
          </SortableContext>
        </DndContext>
      </table>

      {editingRow && (
  <Modal
    initialData={getInitialDataForRow(editingRow)}
    columns={columns} // ✅ REQUIRED
    onClose={() => setEditingRow(null)}
    onSave={handleSaveModal}
  />
)}

    </div>
  );
};

export default TableGrid;
