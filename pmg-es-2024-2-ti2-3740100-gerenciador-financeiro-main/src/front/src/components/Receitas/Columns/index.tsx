"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Receita } from "../Table/types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Actions from "./utility/actions";
import GetPoteName from "./components/getPoteName";

export const columns: ColumnDef<Receita>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
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
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "valor",
		header: "Valor",
		cell: ({ row }) => {
			const value = Number.parseInt(row.getValue("valor") ?? "0");

			const valorFormatado = Intl.NumberFormat("pt-br", {
				style: "currency",
				currency: "BRL",
			}).format(value);

			return valorFormatado;
		},
	},
	{
		accessorKey: "tipoReceita",
		header: "Tipo de receita",
		cell: ({ row }) => {
			return row.getValue("tipoReceita") === "entrada" ? (
				<span className="text-primary">Entrada</span>
			) : (
				<span className="text-red-500">Saída</span>
			);
		},
	},
	{
		accessorKey: "categoria",
		header: "Categoria",
		cell: ({ row }) => {
			const categoria = row.getValue("categoria") as string;
			return <span className="capitalize">{categoria}</span>;
		},
	},
	{
		accessorKey: "descricao",
		header: "Descrição",
	},
	{
		accessorKey: "poteId",
		header: "Pote",
		cell: ({ row }) => {
			const id = Number.parseInt(row.getValue("poteId"));

			return <GetPoteName id={id} />;
		},
	},
	{
		accessorKey: "criadoEm",
		header: "Criado em",
		cell: ({ row }) => {
			const date = row.getValue("criadoEm") as number[];
			if (!date?.length) return "-";

			const createdAt = new Date(
				date[0] ?? 0,
				(date[1] ?? 1) - 1,
				date[2] ?? 1,
				date[3] ?? 0,
				date[4] ?? 0,
				date[5] ?? 0,
				(date[6] ?? 0) / 1000000,
			);
			const createdAtFormatado = format(createdAt, "dd/MM/yyyy HH:mm:ss");

			return createdAtFormatado;
		},
	},
	{
		id: "actions",
		header: "Ações",
		cell: ({ row }) => {
			const id = Number.parseInt(row.getValue("poteId"), 10);

			return <Actions id={id} />;
		},
		enableSorting: false,
		enableHiding: false,
	},
];
