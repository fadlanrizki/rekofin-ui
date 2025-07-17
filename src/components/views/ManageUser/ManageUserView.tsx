'use client'

import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  InputLabel,
  FormControl,
  Pagination,
} from '@mui/material'
import { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const dummyUsers = [
  {
    id: 1,
    fullName: 'Fadlan Rizki',
    email: 'fadlan@example.com',
    role: 'Admin',
  },
  {
    id: 2,
    fullName: 'Alya Mikhaelovna Kujou',
    email: 'alya@example.com',
    role: 'Employee',
  },
  {
    id: 3,
    fullName: 'Megumi Katou',
    email: 'megumi@example.com',
    role: 'Employee',
  },
]

export default function ManageUserView() {
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('All')

  const filteredUsers = dummyUsers.filter((user) => {
    const matchRole =
      filterRole === 'All' || user.role.toLowerCase() === filterRole.toLowerCase()
    const matchSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Manage Users</h1>

        <div className="flex gap-2 flex-wrap">
          <TextField
            size="small"
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl size="small" className="min-w-[160px]">
            <InputLabel>Role</InputLabel>
            <Select
              value={filterRole}
              label="Role"
              onChange={(e) => setFilterRole(e.target.value)}
              className='w-[200px]'
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary">
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton size="small" color="primary">
                      <FaEdit className='text-primary' />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <FaTrashCan />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-end">
        <Pagination count={3} color="primary" />
      </div>
    </div>
  )
}
