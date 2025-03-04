"use client";

import { updateStatus } from "@/lib/api";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Check,
  ChevronDown,
  CircleAlert,
  CircleDot,
  CircleX,
  Copy,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  DialogTrigger,
} from "@/components/ui/dialog";

export type Payment = {
  [x: string]: any;
  id: string;
  amount: number;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  email: string;
  name: string;
  img: string;
  date: string;
  deliveryAddress: string;
  phone: string;
};

const statusColorMap = {
  Pending: "text-yellow-500 bg-yellow-200 border-yellow-500",
  Preparing: "text-indigo-500 bg-indigo-200 border-indigo-500",
  Delivered: "text-emerald-500 bg-emerald-200 border-emerald-500",
  Cancelled: "text-rose-500 bg-rose-200 border-rose-500",
};

const statusIconMap = {
  Pending: <CircleAlert width={15} />,
  Preparing: <CircleDot width={15} />,
  Delivered: <Check width={15} />,
  Cancelled: <CircleX width={15} />,
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ml-3"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ml-3"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "numbering",
    header: "#",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex mx-auto w-72 justify-start items-center">
        <div
          className="w-10 h-10 rounded-full mr-3 bg-cover bg-center ml-5"
          style={{
            backgroundImage: `url(${
              row.original.user?.profile ||
              "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556781.jpg"
            })`,
          }}
        ></div>
        <div className="ml-5 flex flex-col justify-start items-start">
          <div className="font-medium text-base">
            {row.original.user?.name || "-"}
          </div>
          <div className="text-sm text-gray-500 -mt-[3px]">
            {row.original.user?.email || "-"}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "order",
    header: "Orders",
    cell: ({ row }) => (
      <div className="flex mx-auto w-fit justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-sm">
              {row.original.items.length || "-"} Orders
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 flex flex-col gap-3">
            {row.original.items.map((food: any) => (
              <div
                key={food}
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
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-center">{row.original.user?.phoneNumber || "-"}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = row.original.createdAt
        ? new Date(row.original.createdAt).toLocaleDateString("en-Us", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : "-";

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MNT",
      }).format(amount);

      return (
        <div className="text-center font-bold text-[var(--primary)]">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
    cell: ({ row }) => (
      <div className="text-center">{row.original.user?.address || "-"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Delivery State",
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusColorMap;
      const statusColor = statusColorMap[status] || "";
      const statusIcon = statusIconMap[status] || "";

      return (
        <div className="text-center text-xs capitalize flex justify-center">
          <div
            className={`w-fit px-2 rounded-full border ${statusColor} flex flex-row justify-center items-center gap-1`}
          >
            {status} {statusIcon}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              <Copy style={{ width: "13px" }} />
              Copy Order
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              <Pencil style={{ width: "13px" }} />
              Edit Order
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-[var(--destructive)] hover:text-[var(--destructive)]">
              <Trash2 style={{ width: "13px" }} />
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const TableOrder = (props: any) => {
  const { orders } = props;

  let order = orders?.data;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterInput, setFilterInput] = React.useState("");
  const [data, setData] = React.useState(order);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const { name, email, phone } = row.original;

      const lowerFilterValue = filterValue.toLowerCase();
      const lowerName = name.toLowerCase();
      const lowerEmail = email.toLowerCase();
      const lowerPhone = phone.toLowerCase();

      return (
        lowerName.includes(lowerFilterValue) ||
        lowerEmail.includes(lowerFilterValue) ||
        lowerPhone.includes(lowerFilterValue)
      );
    },
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterInput(value);
    table.setGlobalFilter(value);
  };

  // Handle delivery state change
  const handleDeliveryStateChange = (
    newStatus: "Pending" | "Preparing" | "Delivered" | "Cancelled"
  ) => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log(selectedRows);
    const updatedData = data.map((row: any) => {
      if (
        selectedRows.some((selectedRow) => selectedRow.original.id === row.id)
      ) {
        return { ...row, status: newStatus };
      }
      return row;
    });
    setIsDialogOpen(false);
    table.resetRowSelection();
  };

  return (
    <>
      <div className="w-full h-[90%] flex flex-row">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full pb-8 gap-5 pt-2 flex flex-row overflow-hidden">
            <div className="w-full">
              <div className="flex items-center py-4 gap-2">
                <Input
                  placeholder="Filter by name, email, or phone..."
                  value={filterInput}
                  onChange={handleFilterChange}
                  className="max-w-sm bg-[var(--background)]"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Columns <ChevronDown />
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={table.getSelectedRowModel().rows.length === 0}
                    >
                      Change Delivery State (
                      {table.getSelectedRowModel().rows.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        Change Delivery State (
                        {table.getSelectedRowModel().rows.length})
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handleDeliveryStateChange("Pending")}
                      >
                        Set to Pending
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeliveryStateChange("Preparing")}
                      >
                        Set to Preparing
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeliveryStateChange("Delivered")}
                      >
                        Set to Delivered
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDeliveryStateChange("Cancelled")}
                      >
                        Set to Cancelled
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="rounded-md border bg-[var(--background)] overflow-x-auto">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} className="text-center">
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
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="text-center py-3"
                            >
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
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableOrder;
