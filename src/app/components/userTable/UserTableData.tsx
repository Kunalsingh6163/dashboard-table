"use client";
import React, { useState, useEffect, useMemo } from "react";
import { FaSortAlphaDown, FaSortAlphaUp, FaSearch } from "react-icons/fa";
import MOCK_DATA from "../../MOCK_DATA.json"; // Import your data file

const UserTableData: React.FC = () => {
  const [users] = useState(MOCK_DATA); // Full dataset
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [searchByGender, setSearchByGender] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 20; // Items per page

  // 🔍 Search & Filtering (Runs only when search changes)
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1); // Reset to first page after filterin
  }, [search, users]);

  // Search with gender 
  useEffect(() => {
    const filtered = users.filter((user) =>
        user.gender.toLowerCase().includes(searchByGender.toLowerCase())
    );
    setFilteredUsers(filtered);
    setPage(1); // Reset to first page after filterin
  }, [searchByGender, users]);

  // 🔄 Sorting Logic (Efficient sorting using useMemo)
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.first_name.localeCompare(b.first_name)
        : b.first_name.localeCompare(a.first_name)
    );
  }, [sortOrder, filteredUsers]);

  // 📄 Pagination Logic
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * usersPerPage;
    return sortedUsers.slice(startIndex, startIndex + usersPerPage);
  }, [page, sortedUsers]);

  return (
    <div className="max-w-5xl mx-auto mt-5 p-5 bg-white shadow-lg rounded-lg">
      {/* Sorting & Filtering Section */}
      <div className="flex flex-wrap gap-4 mb-5">
        {/* Sort By Name */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-3 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2"
        >
          {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>

        {/* Search by Email */}
        <div className="flex items-center gap-2">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search by Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search by Gender"
            value={searchByGender}
            onChange={(e) => setSearchByGender(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Gender</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Job Title</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-100 transition"
                >
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
};

export default UserTableData;
