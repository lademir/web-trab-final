'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { XSquare } from 'lucide-react';
import { deleteExercise } from "./fn";





interface UserTableProps {
    exercises: {
        id: string;
        name: string;

        description?: string;
    }[];

}

export function ExercisesTable({ exercises }: UserTableProps) {

    // const [selectedRow, setSelectedRow] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const router = useRouter();
    const { toast } = useToast();

    const handleDeleteExercise = async (exerciseId: string) => {
        try {
            await deleteExercise(exerciseId);
            router.refresh();
            toast({
                title: 'Exercício excluído com sucesso',

            });
        } catch (error) {
            toast({
                title: 'Erro ao excluir exercício',
                variant: "destructive"
            });
        }
    };

    const columns: ColumnDef<{
        id: string;
        name: string;

        description?: string;
    }>[] = [
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
                accessorKey: 'description',
                header: 'Descrição',
                minSize: 20,
                cell: ({ row }) => (
                    <div className="flex h-full  flex-1 max-w-full w-80">

                        <Popover>
                            <PopoverTrigger className="hover:cursor-pointer rounded-md px-5 py-2 border-slate-900 hover:bg-slate-900 transition duration-100">Ver descrição</PopoverTrigger>
                            <PopoverContent className="bg-slate-600 text-slate-50 border-slate-900">
                                <div>
                                    <span className="w-full flex justify-between">
                                        <span>Descrição</span>
                                        <PopoverClose>
                                            <XSquare className="self-end hover:cursor-pointer text-red-600 hover:scale-105" />
                                        </PopoverClose>
                                    </span>
                                    <hr className="my-2" />
                                    <span>{row.original.description}</span>
                                </div>
                            </PopoverContent>
                        </Popover>

                    </div>
                ),
            },

            {
                accessorKey: 'actions_delete',
                header: 'Excluir',
                cell: ({ row }) => (
                    <div className="flex h-full  w-28">

                        <Popover modal>
                            <PopoverTrigger asChild>
                                <Button className="w-full">Excluir</Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-slate-600 text-slate-50 border-slate-900">
                                <div className="flex flex-col gap-y-4 justify-center">
                                    <span>Deseja excluir?</span>
                                    <span className="flex flex-row gap-x-5">
                                        <PopoverClose className="w-full flex-1 flex">
                                            <Button onClick={() => handleDeleteExercise(row.original.id)} className="w-full" variant={"destructive"}>
                                                Sim
                                            </Button>
                                        </PopoverClose>
                                        <PopoverClose className="w-full flex-1 flex">
                                            <Button className="w-full" variant={"secondary"}>
                                                Não
                                            </Button>
                                        </PopoverClose>
                                    </span>
                                </div>

                            </PopoverContent>
                        </Popover>

                    </div>
                ),
            }
        ];


    const table = useReactTable({
        data: exercises,
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
                    placeholder="Digite o nome do exercício"
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
            {/* <Button className="w-full mt-5" >
                Adicionar treino
            </Button> */}
            {/* </span> */}
        </div>
    );
}