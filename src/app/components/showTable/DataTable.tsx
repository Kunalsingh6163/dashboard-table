"use client";
import React, { useEffect, useMemo, useState } from "react";
import userData from "../../MOCK_DATA.json";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

function DataTable() {
  const [usersList] = useState(userData);
  const [filteredUsers, setFilteredUsers] = useState(usersList);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const filter = usersList.filter((user) => {
      return user.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filter);
  }, [searchTerm, usersList]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name)
    );
  }, [sortOrder, filteredUsers]);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * usersPerPage;
    return sortedUsers.slice(startIndex, startIndex + usersPerPage);
  }, [page, sortedUsers]);

  return (
    <div>
      {/* Sort By Name */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="px-3 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
      >
        {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
        {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>
      <div>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email"
            className="border-amber-700"
          />
        </div>
        <table className="">
          <thead>
            <tr>
              <th>id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.first_name}</td>
                  <td className="py-2 px-4">{user.last_name}</td>
                  <td className="py-2 px-4">{user.gender}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.job_title}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
