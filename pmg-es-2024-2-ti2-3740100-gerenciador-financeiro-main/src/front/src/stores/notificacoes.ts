import { create } from "zustand";

export type Notificacao = {
	id: number;
	user: {
		id: number;
		notificacoesLidas: [];
	};
	userId: number;
	mensagem: string;
	tipoDeNotificacao: string;
};

interface NotificacaoState {
	notificacoes: Notificacao[];
	setNotificacoes: (notificacoes: Notificacao[]) => void;
	resetNotificacoes: () => void;
}

const useNotificacaoStore = create<NotificacaoState>()((set) => ({
	notificacoes: [],
	setNotificacoes: (notificacoes: Notificacao[]) =>
		set(() => ({ notificacoes })),
	resetNotificacoes: () => set(() => ({ notificacoes: [] })),
}));

export default useNotificacaoStore;
