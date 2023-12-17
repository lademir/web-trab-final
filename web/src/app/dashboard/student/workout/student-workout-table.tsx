'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, ColumnFiltersState, getFilteredRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { initWorkout } from "./fn";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";





interface UserTableProps {
    workouts: {
        id: string;
        name: string;

        Exercises: {
            reps: number;
            series: number;
            weight: number;
            rest: number;
        }[];
    }[];
    studentId: string;
}

export function StudentsWorkoutsTable({ workouts, studentId }: UserTableProps) {

    // const [selectedRow, setSelectedRow] = useState({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const router = useRouter();
    const { toast } = useToast();

    const handleInitWorkout = async (workoutId: string) => {
        try {
            await initWorkout({ workoutId, studentId });
            toast({
                title: "Treino iniciado com sucesso",
            });
            router.push(`/dashboard/student/workout/${workoutId}`);
        } catch (error) {
            toast({
                title: "Erro ao iniciar treino",
                variant: "destructive"
            });
        }
    };

    const columns: ColumnDef<{
        id: string;
        name: string;

        Exercises: {
            reps: number;
            series: number;
            weight: number;
            rest: number;
        }[];
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
                accessorKey: "Iniciar",
                header: "Ação",
                cell: ({ row }) => (
                    <div className="flex h-full  w-28">

                        <Popover modal>
                            <PopoverTrigger asChild>
                                <Button className="w-full">Iniciar</Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-slate-600 text-slate-50 border-slate-900">
                                <div className="flex flex-col gap-y-4 justify-center">
                                    <span>Deseja iniciar treino?</span>
                                    <span className="flex flex-row gap-x-5">
                                        <PopoverClose onClick={() => handleInitWorkout(row.original.id)} className="w-full flex-1 flex">
                                            <span className="bg-slate-800 w-full px-4 py-2 hover:brightness-110 transition duration-150 rounded">
                                                Sim
                                            </span>
                                        </PopoverClose>
                                        <PopoverClose className="w-full flex-1 flex">
                                            <span className="bg-red-800 w-full px-4 py-2 hover:brightness-110 transition duration-150 rounded">
                                                Não
                                            </span>
                                        </PopoverClose>
                                    </span>
                                </div>

                            </PopoverContent>
                        </Popover>

                    </div>
                ),
            }

            // {
            //     accessorKey: 'actions_delete',
            //     header: 'Excluir',
            //     cell: ({ row }) => (
            // <div className="flex h-full  w-28">

            //     <Popover modal>
            //         <PopoverTrigger asChild>
            //             <Button className="w-full">Excluir</Button>
            //         </PopoverTrigger>
            //         <PopoverContent className="bg-slate-600 text-slate-50 border-slate-900">
            //             <div className="flex flex-col gap-y-4 justify-center">
            //                 <span>Deseja excluir?</span>
            //                 <span className="flex flex-row gap-x-5">
            //                     <PopoverClose className="w-full flex-1 flex">
            //                         <Button onClick={() => handleDeleteExercise(row.original.id)} className="w-full" variant={"destructive"}>
            //                             Sim
            //                         </Button>
            //                     </PopoverClose>
            //                     <PopoverClose className="w-full flex-1 flex">
            //                         <Button className="w-full" variant={"secondary"}>
            //                             Não
            //                         </Button>
            //                     </PopoverClose>
            //                 </span>
            //             </div>

            //         </PopoverContent>
            //     </Popover>

            // </div>
            //     ),
            // }
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
            {/* <Button className="w-full mt-5" >
                Adicionar treino
            </Button> */}
            {/* </span> */}
        </div>
    );
}