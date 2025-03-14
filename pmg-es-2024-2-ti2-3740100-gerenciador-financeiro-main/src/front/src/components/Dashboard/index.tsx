"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
	ArrowUpRight,
	ArrowDownRight,
	Wallet,
	PiggyBank,
	Target,
} from "lucide-react";
import Header from "@/components/Dashboard/components/Header";
import EntradasChart from "@/components/Dashboard/components/Entradas";
import SaidasChart from "@/components/Dashboard/components/Saidas";
import CardPote from "@/components/Potes/components/Pote/Card";
import Link from "next/link";
import { usePote } from "@/contexts/PoteContext";
import { useReceita } from "@/contexts/ReceitaContext";

export default function DashboardLayout() {
	const [totalEntradas, setTotalEntradas] = useState<number[]>([]);
	const [totalSaidas, setTotalSaidas] = useState<number[]>([]);
	const [percentualGanhoEntradas, setPercentualGanhoEntradas] = useState(0);
	const [percentualGanhoSaidas, setPercentualGanhoSaidas] = useState(0);

	const { potes } = usePote();
	const { receitas } = useReceita();

	useEffect(() => {
		const monthlyEntradas = Array(12).fill(0);
		const monthlySaidas = Array(12).fill(0);

		for (const receita of receitas) {
			if (receita.criadoEm[1]) {
				const month = receita.criadoEm[1] - 1;
				if (receita.tipoReceita === "entrada") {
					monthlyEntradas[month] += receita.valor;
				} else {
					monthlySaidas[month] += receita.valor;
				}
			}
		}

		setTotalEntradas(monthlyEntradas);
		setTotalSaidas(monthlySaidas);

		const currentMonth = new Date().getMonth();
		const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

		const currentMonthValueEntradas = monthlyEntradas[currentMonth];
		const lastMonthValueEntradas = monthlyEntradas[lastMonth];

		const currentMonthValueSaidas = monthlySaidas[currentMonth];
		const lastMonthValueSaidas = monthlySaidas[lastMonth];

		const percentualGanhoEntradas =
			lastMonthValueEntradas === 0 && currentMonthValueEntradas > 0
				? 100
				: lastMonthValueEntradas > 0
					? ((currentMonthValueEntradas - lastMonthValueEntradas) /
							lastMonthValueEntradas) *
						100
					: 0;

		const percentualGanhoSaidas =
			lastMonthValueSaidas === 0 && currentMonthValueSaidas > 0
				? -100
				: lastMonthValueSaidas > 0
					? ((currentMonthValueSaidas - lastMonthValueSaidas) /
							lastMonthValueSaidas) *
						100
					: 0;

		setPercentualGanhoEntradas(percentualGanhoEntradas);
		setPercentualGanhoSaidas(percentualGanhoSaidas);
	}, [receitas]);

	const saldo =
		totalEntradas.reduce((acc, val) => acc + val, 0) -
		totalSaidas.reduce((acc, val) => acc + val, 0);
	const totalEntradasSum = totalEntradas.reduce((acc, val) => acc + val, 0);
	const totalSaidasSum = totalSaidas.reduce((acc, val) => acc + val, 0);

	const percentualEconomia =
		totalEntradasSum > 0
			? ((totalEntradasSum - totalSaidas.reduce((acc, val) => acc + val, 0)) /
					totalEntradasSum) *
				100
			: 0;

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<div className="p-8">
				<div className="mb-8 flex items-center justify-between">
					<h1 className="text-3xl font-bold text-gray-900">Bem Vindo(a)!</h1>
					<div className="flex items-center space-x-4">
						<span className="text-sm text-gray-500">
							Última atualização: {new Date().toLocaleDateString()}
						</span>
					</div>
				</div>

				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					<Card className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Total Entradas
								</p>
								<h3 className="text-2xl font-bold text-gray-900">
									R${" "}
									{totalEntradasSum.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</h3>
								<div className="mt-2 flex items-center">
									<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
									<span className="text-sm font-medium text-green-500">
										{percentualGanhoEntradas.toFixed(1)}%
									</span>
								</div>
							</div>
							<div className="rounded-full bg-green-100 p-3">
								<Wallet className="h-6 w-6 text-green-600" />
							</div>
						</div>
					</Card>

					<Card className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Total Saídas
								</p>
								<h3 className="text-2xl font-bold text-gray-900">
									R${" "}
									{totalSaidasSum.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</h3>
								<div className="mt-2 flex items-center">
									<ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
									<span className="text-sm font-medium text-red-500">
										{percentualGanhoSaidas.toFixed(1)}%
									</span>
								</div>
							</div>
							<div className="rounded-full bg-red-100 p-3">
								<PiggyBank className="h-6 w-6 text-red-600" />
							</div>
						</div>
					</Card>

					<Card className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">Saldo</p>
								<h3 className="text-2xl font-bold text-gray-900">
									R${" "}
									{saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
								</h3>
								<div className="mt-2 flex items-center">
									<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
									<span className="text-sm font-medium text-green-500">
										{percentualEconomia.toFixed(1)}%
									</span>
								</div>
							</div>
							<div className="rounded-full bg-blue-100 p-3">
								<Target className="h-6 w-6 text-blue-600" />
							</div>
						</div>
					</Card>
				</div>

				<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
					<Card className="p-6">
						<h3 className="mb-4 text-lg font-semibold">Entradas</h3>
						<div className="h-[300px]">
							<EntradasChart chartData={totalEntradas} />
						</div>
					</Card>

					<Card className="p-6">
						<h3 className="mb-4 text-lg font-semibold">Saídas</h3>
						<div className="h-[300px]">
							<SaidasChart chartData={totalSaidas} />
						</div>
					</Card>
				</div>

				<Card className="p-6">
					<h3 className="mb-6 text-lg font-semibold">Potes Recentes</h3>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
						{potes
							.filter((_item, idx) => idx < 5)
							.map((pote) => {
								const total = receitas
									.filter((receita) => receita.poteId === pote.id)
									.reduce((acc, value) => acc + value.valor, 0);

								return (
									<Link href={"/dashboard/potes"} key={pote.id}>
										<CardPote
											categoria={pote.categoria}
											id={pote.id}
											dataLimite={pote.dataLimite}
											disabled={true}
											metaPote={pote.metaPote}
											nomePote={pote.nomePote}
											receitaMensal={pote.receitaMensal}
											valorInicial={pote.valorInicial}
											valorMeta={pote.valorMeta}
											total={total}
										/>
									</Link>
								);
							})}
					</div>
				</Card>
			</div>
		</div>
	);
}
