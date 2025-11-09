import React from "react";
import { motion } from "framer-motion";

const StudentOk = () => {
  const tokens = [
    { id: 1, name: "John Doe", date: "2025-11-08", status: "Approved" },
    { id: 2, name: "Jane Smith", date: "2025-11-07", status: "Pending" },
    { id: 3, name: "Aarav Patel", date: "2025-11-06", status: "Rejected" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10 px-4">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Student Tokens
      </motion.h1>

      <motion.div
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <motion.tr
                key={token.id}
                className="hover:bg-blue-50 transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-3 px-4 border-b">{token.id}</td>
                <td className="py-3 px-4 border-b">{token.name}</td>
                <td className="py-3 px-4 border-b">{token.date}</td>
                <td
                  className={`py-3 px-4 border-b font-semibold ${
                    token.status === "Approved"
                      ? "text-green-600"
                      : token.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {token.status}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default StudentOk;
