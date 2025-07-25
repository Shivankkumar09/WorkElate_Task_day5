import { useState } from "react";

const CellRenderer = ({ type, value, options, onChange }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleBlur = () => {
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // triggers onBlur
    }
  };

  if (type === "select") {
    return (
      <select
        className="w-full px-2 py-1 border rounded"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange(e.target.value); // immediate change for selects
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      className="w-full px-2 py-1 border rounded"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onContextMenu={(e) => e.stopPropagation()}
    />
  );
};

export default CellRenderer;
