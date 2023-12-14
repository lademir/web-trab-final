'use client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

interface Student {
    name: string;
    email: string;
    id: number;
}



const columns: ColumnDef<Student>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
            <div className="flex h-full  w-10 ml-0">

                {row.original.id}

            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: 'Nome',
        minSize: 20,
        cell: ({ row }) => (
            <div className="flex h-full  flex-1 max-w-full w-80">

                {row.original.name}

            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => (
            <div className="flex h-full  w-28">

                {row.original.email}

            </div>
        ),
    },
    {
        accessorKey: 'actions',
        header: 'Adicionar treino',
        cell: ({ row }) => (
            <div className="flex h-full  w-28">

                <Link href={`/dashboard/trainer/workouts/${row.original.id}`}>
                    <Button className="w-full">Ver treinos</Button>
                </Link>

            </div>
        ),
    }
];

interface UserTableProps {
    students: Student[];

}

export function StudentsTable({ students }: UserTableProps) {

    // const [selectedRow, setSelectedRow] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);


    const table = useReactTable({
        data: students,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // onRowSelectionChange: setSelectedRow,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            // rowSelection: selectedRow,
            columnFilters
        },
        enableMultiRowSelection: false,
    });

    return (
        <div>
            {/* {JSON.stringify(table.getAllColumns())} */}
            <div className="flex items-center py-4">
                <Input
                    placeholder="Digite o nome do usuário"
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <Table >
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
                            <TableCell colSpan={columns.length} className="h-24 text-slate-50 text-center">
                                Sem dados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* <span className="w-full flex justify-center"> */}
            <Button className="w-full mt-5" >
                Adicionar aluno
            </Button>
            {/* </span> */}
        </div>
    );
}