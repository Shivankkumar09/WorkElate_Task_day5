import { useState, useEffect } from "react";

const Modal = ({ onClose, onSave, initialData = {}, columns = [] }) => {
  const [formData, setFormData] = useState({});

 useEffect(() => {
  setFormData({ ...initialData }); // make a new object
}, [initialData]);

  const handleChange = (colId, value) => {
    setFormData(prev => ({
      ...prev,
      [colId]: value,
    }));
  };

  const renderField = (col) => {
    const value = formData[col.id] || "";

  if (col.type === "select" && Array.isArray(col.options)) {
  return (
    <select
      value={value}
      onChange={(e) => handleChange(col.id, e.target.value)}
      className="border p-1 w-full"
    >
      {col.options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

    return (
      <input
        type={col.type === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => handleChange(col.id, e.target.value)}
        className="border p-1 w-full"
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 space-y-3">
        <h2 className="text-xl font-bold">Edit Row</h2>

        {columns.map((col) => (
          <div key={col.id}>
            <label className="block text-sm mb-1">{col.name}</label>
            {renderField(col)}
          </div>
        ))}

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
