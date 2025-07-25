import { useState } from "react";

const CellRenderer = ({ type = "text", value, options = [], onChange }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleBlur = () => {
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.target.blur(); // Commit on Enter
    }
  };

  if (type === "select") {
    return (
      <select
        className="w-full px-2 py-1 border rounded"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange(e.target.value); // immediate update for dropdowns
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
