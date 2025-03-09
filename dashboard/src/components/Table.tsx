"use client";

import React, { useState, useEffect } from "react";
import { updateStatus, deleteOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Check,
  CircleAlert,
  CircleDot,
  CircleX,
  Copy,
  MoreHorizontal,
  Pencil,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type Payment = {
  _id: string;
  totalPrice: number;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  items: any[];
  createdAt: string;
  user: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    profile?: string;
    address?: string;
  };
};

const statusStyles = {
  Pending: {
    color: "text-yellow-500",
    bg: "bg-yellow-200",
    border: "border-yellow-500",
    icon: <CircleAlert size={15} />,
  },
  Preparing: {
    color: "text-indigo-500",
    bg: "bg-indigo-200",
    border: "border-indigo-500",
    icon: <CircleDot size={15} />,
  },
  Delivered: {
    color: "text-emerald-500",
    bg: "bg-emerald-200",
    border: "border-emerald-500",
    icon: <Check size={15} />,
  },
  Cancelled: {
    color: "text-rose-500",
    bg: "bg-rose-200",
    border: "border-rose-500",
    icon: <CircleX size={15} />,
  },
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-5"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className="w-10 h-10 rounded-full mr-3 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              row.original.user?.profile ||
              "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556781.jpg"
            })`,
          }}
        />
        <div>
          <div className="font-medium">{row.original.user?.name || "-"}</div>
          <div className="text-sm text-gray-500">
            {row.original.user?.email || "-"}
          </div>
        </div>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const nameA = rowA.original.user?.name || "";
      const nameB = rowB.original.user?.name || "";
      return nameA.localeCompare(nameB);
    },
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Orders
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex mx-auto w-fit justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-sm">
              {row?.original?.items?.length || "-"} Orders
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 flex flex-col gap-3">
            {row.original.items.map((food: any, i: any) => (
              <div
                key={i}
                className="w-full h-12 rounded-[var(--radius)] flex flex-row justify-between items-center"
              >
                <div className="h-full flex justify-start items-center">
                  <div
                    className="h-full w-auto aspect-square bg-slate-300 rounded-[var(--radius)] bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${food?.food?.image || "null"})`,
                    }}
                  ></div>
                  <div className="flex flex-col ml-3">
                    <p className="text-sm font-bold">{food?.food?.foodName}</p>
                    <p className="text-xs text-[var(--muted-foreground)] ">
                      {food?.food?.price} MNT
                    </p>
                  </div>
                </div>
                <p className="text-base font-medium">{food?.quantity}x</p>
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const countA = rowA.original.items.length;
      const countB = rowB.original.items.length;
      return countA - countB;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.user?.phoneNumber || "-"}</div>
    ),
    sortingFn: (rowA, rowB) => {
      const phoneA = rowA.original.user?.phoneNumber || "";
      const phoneB = rowB.original.user?.phoneNumber || "";
      return phoneA.localeCompare(phoneB);
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.createdAt || 0);
      const dateB = new Date(rowB.original.createdAt || 0);
      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center font-bold text-primary">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "MNT",
        }).format(row.getValue("totalPrice"))}
      </div>
    ),
  },
  {
    accessorKey: "deliveryAddress",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.user?.address || "-"}</div>
    ),
    sortingFn: (rowA, rowB) => {
      const addrA = rowA.original.user?.address || "";
      const addrB = rowB.original.user?.address || "";
      return addrA.localeCompare(addrB);
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusStyles;
      const { color, bg, border, icon } = statusStyles[status];
      return (
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 rounded-full border ${color} ${bg} ${border} flex items-center gap-1 text-xs`}
          >
            {status} {icon}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const [editOpen, setEditOpen] = useState(false);

      const handleStatusChange = async (newStatus: Payment["status"]) => {
        try {
          await updateStatus({ orderId: row.original._id, newStatus });
          table.options.meta?.updateData((old: Payment[]) =>
            old.map((item) =>
              item._id === row.original._id
                ? { ...item, status: newStatus }
                : item
            )
          );
          toast.success("Status updated");
          setEditOpen(false);
        } catch (error) {
          toast.error("Failed to update status");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(row.original._id);
                  toast.success("Order ID copied");
                }}
              >
                <Copy size={13} className="mr-2" /> Copy Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <Pencil size={13} className="mr-2" /> Edit Order
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={async () => {
                  if (!confirm("Are you sure you want to delete this order?"))
                    return;
                  try {
                    await deleteOrder({ orderId: row.original._id });
                    table.options.meta?.updateData((old: Payment[]) =>
                      old.filter((item) => item._id !== row.original._id)
                    );
                    toast.success("Order deleted");
                  } catch (error) {
                    toast.error("Failed to delete order");
                  }
                }}
              >
                <Trash2 size={13} className="mr-2" /> Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Order Status</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {Object.keys(statusStyles).map((status) => (
                  <Button
                    key={status}
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      handleStatusChange(status as Payment["status"])
                    }
                  >
                    Set to {status}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

const TableOrder = ({ orders }: { orders: { data: Payment[] } }) => {
  const [data, setData] = useState(orders?.data || []);
  const [filterInput, setFilterInput] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(orders?.data || []);
  }, [orders]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter: filterInput,
      rowSelection,
    },
    meta: {
      updateData: (updater: any) =>
        setData((old) =>
          typeof updater === "function" ? updater(old) : updater
        ),
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const searchTerm = filterValue.toLowerCase();
      const fields = [
        row.original.user?.name || "",
        row.original.user?.email || "",
        row.original.user?.phoneNumber || "",
      ];
      return fields.some((field) => field.toLowerCase().includes(searchTerm));
    },
  });

  const handleStatusChange = async (newStatus: Payment["status"]) => {
    const selectedRows = table.getSelectedRowModel().rows;
    try {
      await Promise.all(
        selectedRows.map((row) =>
          updateStatus({ orderId: row.original._id, newStatus })
        )
      );
      table.options.meta?.updateData((old: Payment[]) =>
        old.map((order) =>
          selectedRows.some((row) => row.original._id === order._id)
            ? { ...order, status: newStatus }
            : order
        )
      );
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsDialogOpen(false);
      table.resetRowSelection();
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search"
          value={filterInput}
          onChange={(e) => {
            setFilterInput(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          className="max-w-sm bg-[var(--background)]"
        />
        <Button
          variant="outline"
          disabled={!table.getSelectedRowModel().rows.length}
          onClick={() => setIsDialogOpen(true)}
        >
          Change Status ({table.getSelectedRowModel().rows.length})
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Change Status ({table.getSelectedRowModel().rows.length})
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {Object.keys(statusStyles).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    handleStatusChange(status as Payment["status"])
                  }
                >
                  Set to {status}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border overflow-x-auto bg-[var(--background)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-[var(--background)]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="py-20"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
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
  );
};

export default TableOrder;
