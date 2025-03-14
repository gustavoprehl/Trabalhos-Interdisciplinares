"use client";

import { useEffect, useState } from "react";
import CardPote from "./Card";
import usePoteStore from "@/stores/potes";
import useReceitaStore from "@/stores/receitas";
import type { Receita } from "@/components/Receitas/Table/types";

export interface Pote {
	dataLimite: number[];
	id: number;
	metaPote: string;
	nomePote: string;
	receitaMensal: number;
	valorMeta: number;
	valorInicial: number;
	categoria: string;
}

export default function Potes() {
	const [potesState, setPotes] = useState<Pote[]>();
	const [receitasState, setReceitas] = useState<Receita[]>();
	const potes = usePoteStore((state) => state.potes);
	const receitas = useReceitaStore((state) => state.receitas);

	useEffect(() => {
		setPotes(potes);
		console.log(potes)
	}, [potes]);

	useEffect(() => {
		setReceitas(receitas);
	}, [receitas]);

	return (
		<div className="pt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
			{potesState && potesState.length > 0 ? (
				potesState.map((pote) => {
					if (receitasState) {
						const total = receitasState
							.filter((receita) => receita.poteId === pote.id)
							.reduce((acc, value) => acc + value.valor, 0);

						return (
							<CardPote
								key={pote.id}
								id={pote.id}
								dataLimite={pote.dataLimite}
								disabled={false}
								metaPote={pote.metaPote}
								nomePote={pote.nomePote}
								receitaMensal={pote.receitaMensal}
								valorInicial={pote.valorInicial}
								valorMeta={pote.valorMeta}
								categoria={pote.categoria}
								total={total}
							/>
						);
					}
					return (
						<CardPote
							key={pote.id}
							id={pote.id}
							dataLimite={pote.dataLimite}
							disabled={false}
							metaPote={pote.metaPote}
							nomePote={pote.nomePote}
							receitaMensal={pote.receitaMensal}
							valorInicial={pote.valorInicial}
							valorMeta={pote.valorMeta}
							categoria={pote.categoria}
							total={0}
						/>
					);
				})
			) : (
				<div>
					<p>Nenhum pote para ser exibido.</p>
				</div>
			)}
		</div>
	);
}
