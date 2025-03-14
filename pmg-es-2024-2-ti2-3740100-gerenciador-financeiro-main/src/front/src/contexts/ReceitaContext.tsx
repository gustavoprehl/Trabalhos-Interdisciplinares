"use client";

import usePoteStore from "@/stores/potes";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { api } from "@/lib/api";
import type { Receita } from "@/components/Receitas/Table/types";
import useReceitaStore from "@/stores/receitas";

interface ReceitaContextType {
	receitas: Receita[];
}

const ReceitaContext = createContext<ReceitaContextType | undefined>(undefined);

export const ReceitaProvider = ({ children }: { children: React.ReactNode }) => {
	const [isFetchingReceitas, setFetchingReceitas] = useState(true);
	const [receitasState, setReceitas] = useState<Receita[]>();
	const { token, logout } = useAuth();
	const { addReceita, receitas } = useReceitaStore((state) => state);
	const router = useRouter();
	const { potes } = usePoteStore((state) => state);

	useEffect(() => {
		const fetchReceitas = async () => {
			if (token && potes) {
				setFetchingReceitas(true);

				try {
					const promises = potes.map((pote) =>
						api
							.get(`/receitas/pote/${pote.id}`, {
								headers: {
									Authorization: token,
								},
							})
							.then((response) => {
								if (response.status === 200 && Array.isArray(response.data)) {
									for (const receita of response.data) {
										addReceita({ ...receita });
									}
								}
							})
							.catch((error) => {
								if (isAxiosError(error) && error.response?.status === 403) {
									logout();
									router.push("/");
								}
								console.error(error);
							})
					);

					// Wait for all API calls to complete
					await Promise.all(promises);
				} catch (error) {
					console.error("Error fetching receitas:", error);
				} finally {
					setFetchingReceitas(false);
				}
			}
		};

		fetchReceitas();
	}, [potes, token, addReceita, logout, router]);

	useEffect(() => {
		if (!isFetchingReceitas) {
			setReceitas(receitas);
		}
	}, [receitas, isFetchingReceitas]);

	return (
		<ReceitaContext.Provider value={{ receitas: receitasState ? receitasState : [] }}>
			{children}
		</ReceitaContext.Provider>
	);
};

export const useReceita = () => {
	const context = useContext(ReceitaContext);

	if (!context) {
		throw new Error("useReceita must be used within a ReceitaProvider");
	}

	return context;
};
