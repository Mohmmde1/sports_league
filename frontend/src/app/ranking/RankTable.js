// DataTableDemo.js
"use client"

import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,getSortedRowModel,    getFilteredRowModel,

  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddGame from "./AddGame";
import EditGame from "./EditGame";
import RankingsDialog from "./RankingsDialog"; // Import the RankingsDialog component
import { deleteGame } from "@/lib/actions";



const columns = [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "team1",
    header: "Team 1",
    cell: ({ row }) => <div> {row.original.team1.name} </div>,
  },
  {
    accessorKey: "team1_score",
    header: "Team 1 Score",
  },
  {
    accessorKey: "team2",
    header: "Team 2",
    cell : ({ row }) => ( <div> {row.original.team2.name} </div> )
  },
  {
    accessorKey: "team2_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team 2 Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )}
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <EditGame data={row.original} />
        <Button variant="destructive" className="ml-2" onClick={async () => deleteGame(row.original.id)}>
          Delete
        </Button>
      </div>
    ),
  },
];

export default function DataTableDemo({ games, rankings }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isRankingsDialogOpen, setIsRankingsDialogOpen] = useState(false);
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: games,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
      sorting
    },
  });

  const handleEdit = (id) => {
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter games..."
          value={(table.getColumn("team1").getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("team1").setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <AddGame data={games} />
        <Button
          variant="primary"
          className="ml-2"
          onClick={() => setIsRankingsDialogOpen(true)}
        >
          Show Rankings
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <RankingsDialog
        isOpen={isRankingsDialogOpen}
        onClose={() => setIsRankingsDialogOpen(false)}
        rankings={rankings}
      />
    </div>
  );
}
