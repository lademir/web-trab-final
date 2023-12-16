'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Workout } from "@/models/workout";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { WorkoutDetails } from "./WorkoutDetails";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { deleteWorkout } from "./fn";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";





interface UserTableProps {
    workouts: Workout[];

}

export function WorkoutTable({ workouts }: UserTableProps) {

    // const [selectedRow, setSelectedRow] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const router = useRouter();
    const { toast } = useToast();

    const handleDeleteWorkout = async (workoutId: string) => {
        try {
            await deleteWorkout(workoutId);
            router.refresh();
            toast({
                title: "Treino excluído com sucesso",
            });

        } catch (error) {
            toast({
                title: "Erro ao excluir treino",
                variant: "destructive"

            });
        }
    };

    const columns: ColumnDef<Workout>[] = [
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
            accessorKey: 'actions_see',
            header: 'Ver treino',
            cell: ({ row }) => (
                <div className="flex h-full  w-28">

                    <Sheet>
                        <SheetTrigger>
                            Abrir
                        </SheetTrigger>
                        <SheetContent>
                            <WorkoutDetails workout={row.original} />
                        </SheetContent>

                    </Sheet>

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
                                        <Button onClick={() => handleDeleteWorkout(row.original.id)} className="w-full" variant={"destructive"}>
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
        data: workouts,
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
                    placeholder="Digite o nome do treino"
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
                Adicionar treino
            </Button>
            {/* </span> */}
        </div>
    );
}