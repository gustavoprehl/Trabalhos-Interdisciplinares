import { create } from "zustand";

type Pote = {
	id: number;
	nomePote: string;
	valorMeta: number;
	metaPote: string;
	dataLimite: number[];
	valorInicial: number;
	receitaMensal: number;
	categoria: string;
};

interface PoteState {
	potes: Pote[];
	setPotes: (potes: Pote[]) => void;
	updatePote: (pote: Pote) => void;
	addPote: (pote: Pote) => void;
	removePote: (id: number) => void;
	resetPotes: () => void;
}

const usePoteStore = create<PoteState>()((set) => ({
	potes: [],
	setPotes: (potes: Pote[]) => set(() => ({ potes })),
	updatePote: (pote: Pote) =>
		set((state) => ({
			potes: [...state.potes.filter((p) => p.id !== pote.id), pote],
		})),
	addPote: (pote: Pote) => set((state) => ({ potes: [...state.potes, pote] })),
	removePote: (id: number) =>
		set((state) => ({ potes: state.potes.filter((pote) => pote.id !== id) })),
	resetPotes: () => set(() => ({ potes: [] })),
}));

export default usePoteStore;
