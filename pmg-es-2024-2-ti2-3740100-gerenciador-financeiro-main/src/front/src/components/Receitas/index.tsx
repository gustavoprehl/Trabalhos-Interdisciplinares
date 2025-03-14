"use client";

import Header from "../Dashboard/components/Header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ReceitasTable } from "./Table";
import { columns } from "./Columns";
import { CreateDialog } from "./Create";
import { useEffect, useState } from "react";
import type { Receita } from "./Table/types";
import useReceitaStore from "@/stores/receitas";
import { useQueryState } from "nuqs";

export default function ReceitasLayout() {
	const [receitasState, setReceitas] = useState<Receita[]>([]);
	const receitas = useReceitaStore((state) => state.receitas);
	const [filterBy] = useQueryState("filterBy");
	const [poteId] = useQueryState("poteId");
	const [tipo] = useQueryState("tipo");

	useEffect(() => {
		let filteredReceitas = [...receitas];

		if (filterBy === "pote" && poteId) {
			filteredReceitas = receitas.filter(
				(receita) => receita.poteId === Number.parseInt(poteId, 10),
			);
		} else if (filterBy === "tipo" && tipo) {
			filteredReceitas = receitas.filter(
				(receita) => receita.tipoReceita === tipo,
			);
		}

		setReceitas(filteredReceitas);
	}, [filterBy, poteId, receitas, tipo]);

	return (
		<div>
			<Header />
			<main className="py-4 px-4 lg:px-6 lg:py-6">
				<Card>
					<CardHeader>
						<CardTitle>
							<div className="w-full flex flex-row justify-between items-center">
								<div>
									<h1>Receitas</h1>
								</div>
								<div className="flex flex-row gap-2">
									<CreateDialog />
								</div>
							</div>
						</CardTitle>
						<CardDescription>
							Gerencie as suas receitas usando a tabela abaixo.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ReceitasTable columns={columns} data={receitasState} />
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
