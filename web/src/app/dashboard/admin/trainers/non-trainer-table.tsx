"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { addTrainer } from "./fn";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
export type NonTrainer = {
    id: number;
    name: string;
};

interface NonTrainerTableProps {
    nonTrainers: NonTrainer[];
}

const columns: ColumnDef<NonTrainer>[] = [
    {
        id: "select",
        header: "Selecionar",
        cell: ({ row }) => (
            <div className="flex h-full w-full">
                <Checkbox
                    className=""
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    }
];

export const NonTrainerTable = ({ nonTrainers }: NonTrainerTableProps) => {

    const [selectedRow, setSelectedRow] = useState({});
    const router = useRouter();
    const { toast } = useToast();

    const table = useReactTable({
        data: nonTrainers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setSelectedRow,
        state: {
            rowSelection: selectedRow
        },
        enableMultiRowSelection: false,
    });

    const handleCreateTrainer = async () => {
        try {
            await addTrainer(table.getSelectedRowModel().rows[0].original.id);
            router.refresh();
            toast({
                title: 'Treinador atribuído com sucesso!',
            });
        } catch (error: any) {
            const msg = error.response.data.message || 'Erro ao atribuir treinador!';
            toast({
                title: msg,
                variant: "destructive"
            });
        }
    };

    // console.log(JSON.stringify(selectedRow));
    return (
        <div>
            {/* {JSON.stringify(selectedRow)} */}
            {/* {table.getSelectedRowModel().rows.map(row => JSON.stringify(row.original))} */}
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
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Sem dados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* <span className="w-full flex justify-center"> */}
            <Button className="w-full" onClick={handleCreateTrainer}>
                Atribuir treinador
            </Button>
            {/* </span> */}
        </div>
    );
};
