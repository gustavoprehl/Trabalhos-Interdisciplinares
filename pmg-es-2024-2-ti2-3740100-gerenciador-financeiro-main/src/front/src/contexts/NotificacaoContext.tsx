"use client";

import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { api } from "@/lib/api";
import useSWR from "swr";
import useNotificacaoStore from "@/stores/notificacoes";

type Notificacao = {
	id: number;
	userId: number;
	mensagem: string;
	tipoDeNotificacao: string;
};

interface NotificacaoContextType {
	notificacoes: Notificacao[];
}

const NotificacaoContext = createContext<NotificacaoContextType | undefined>(
	undefined,
);

export const NotificacaoProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const { token } = useAuth();
	const setReceitas = useNotificacaoStore((state) => state.setNotificacoes);

	const fetcher = (url: string) =>
		api.get(url, { headers: { Authorization: token } }).then((res) => res.data);

	const { data } = useSWR("/notificacoes/user", fetcher, {
		refreshInterval: 1000,
	});

	useEffect(() => {
		setReceitas(data);
	}, [setReceitas, data]);

	return (
		<NotificacaoContext.Provider value={{ notificacoes: data }}>
			{children}
		</NotificacaoContext.Provider>
	);
};

export const useNotificacao = () => {
	const context = useContext(NotificacaoContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
