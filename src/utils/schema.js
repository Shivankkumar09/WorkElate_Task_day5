import { v4 as uuid } from "uuid";

export const initialColumns = [
  { id: uuid(), name: "Name", type: "text" },
  { id: uuid(), name: "Status", type: "select", options: ["Open", "Closed"] },
];

export const initialRows = (columns) => {
  return Array.from({ length: 3 }, () => {
    const id = uuid();
    const cells = Object.fromEntries(columns.map(col => [col.id, ""]));
    return { id, cells };
  });
};
