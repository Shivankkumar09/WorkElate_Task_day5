import React from 'react';
import TableGrid from '../components/TableGrid';

export default function TablePage() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className=" mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">📊 Table Editor</h1>
        <TableGrid />
      </div>
    </main>
  );
}
