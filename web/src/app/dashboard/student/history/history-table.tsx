'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";



interface NonTrainerTableProps {
    workoutLogs: {
        createdAt: string;

        name: string;
        id: number;

    }[];
}

const columns: ColumnDef<{
    createdAt: string;
    name: string;
    id: number;

}>[] = [

        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => {
                return row.original.id;
            }
        },
        {
            accessorKey: 'name',
            id: 'name',

            header: 'Nome',
            cell: ({ row }) => {
                return row.original.name;
            }
        },
        {
            accessorKey: 'date',
            id: 'date',
            header: 'Quando',
            cell: ({ row }) => {
                return row.original.createdAt;
            }
        }
    ];

export const WorkoutLogTable = ({ workoutLogs }: NonTrainerTableProps) => {

    // const [selectedRow, setSelectedRow] = useState({});



    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const router = useRouter();
    const { toast } = useToast();

    const table = useReactTable({
        data: workoutLogs,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // onRowSelectionChange: setSelectedRow,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            // rowSelection: selectedRow,
            columnFilters,
        },
        enableMultiRowSelection: false,
    });



    // console.log(JSON.stringify(selectedRow));
    return (
        <div>
            {/* {JSON.stringify(selectedRow)} */}
            {/* {table.getSelectedRowModel().rows.map(row => JSON.stringify(row.original))} */}
            {/* {table.getFilteredRowModel().rows.map(row => JSON.stringify(row.original))} */}
            {/* {table.getAllColumns().map(column => JSON.stringify(column))} */}
            <div>
                <Input
                    placeholder="Digite um nome de treino"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                            {
                                headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="text-slate-50" key={header.id}>
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                        </TableHead>
                                    );
                                })
                            }
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={`bg-transparent hover:bg-slate-600`}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell className="text-slate-50" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-slate-50">
                                Sem dados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    );
};
