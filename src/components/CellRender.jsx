import { useState, useEffect } from "react";

const CellRenderer = ({ type = "text", value, options = [], onChange, onExpand }) => {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  if (type === "select") {
    return (
      <select
        className="w-full border px-1"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          onChange(e.target.value);
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      className="w-full border px-1"
      type="text"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => onChange(localValue)}
    />
  );
};

export default CellRenderer;
