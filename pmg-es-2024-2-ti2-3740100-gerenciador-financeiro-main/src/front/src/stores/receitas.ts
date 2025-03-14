import { create } from "zustand";

type Receita = {
	id: number;
	poteId: number;
	valor: number;
	tipoReceita: "entrada" | "saida";
	categoria: string;
	descricao: string;
	criadoEm: number[];
};

interface ReceitaState {
	receitas: Receita[];
	setReceitas: (receitas: Receita[]) => void;
	addReceita: (receita: Receita) => void;
	updateReceita: (receita: Receita) => void;
	removeReceita: (id: number) => void;
	resetReceitas: () => void;
}

const useReceitaStore = create<ReceitaState>()((set) => ({
	receitas: [],
	setReceitas: (receitas: Receita[]) => set(() => ({ receitas })),
	addReceita: (receita: Receita) =>
		set((state) => {
			const exists = state.receitas.some((r) => r.id === receita.id);
			if (exists) {
				return { receitas: state.receitas };
			}
			return { receitas: [...state.receitas, receita] };
		}),
	updateReceita: (receita: Receita) =>
		set((state) => ({
			receitas: [...state.receitas.filter((r) => r.id !== receita.id), receita],
		})),
	removeReceita: (id: number) =>
		set((state) => ({
			receitas: state.receitas.filter((receita) => receita.id !== id),
		})),
	resetReceitas: () => set(() => ({ receitas: [] })),
}));

export default useReceitaStore;
