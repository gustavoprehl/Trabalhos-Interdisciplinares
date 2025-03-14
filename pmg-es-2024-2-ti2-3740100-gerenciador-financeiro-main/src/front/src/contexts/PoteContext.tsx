"use client";

import type { Pote } from "@/components/Potes/components/Pote";
import usePoteStore from "@/stores/potes";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { api } from "@/lib/api";

interface PoteContextType {
	potes: Pote[];
}

const PoteContext = createContext<PoteContextType | undefined>(undefined);

export const PoteProvider = ({ children }: { children: React.ReactNode }) => {
	const [potesState, setPotes] = useState<Pote[]>();
	const [isFetching, setFetching] = useState(true);
	const potes = usePoteStore((state) => state.potes);
	const { token, logout } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (token && isFetching) {
			api
				.get("/pote/user", {
					headers: {
						Authorization: token,
					},
				})
				.then((response) => {
					if (
						response.status === 200 &&
						response.data &&
						(response.data satisfies Pote[])
					) {
						usePoteStore.setState({ potes: response.data });
					}
				})
				.catch((error) => {
					if (isAxiosError(error)) {
						if (error.status === 403) {
							logout();
							router.push("/");
						}
					}
				});
			setFetching(false);
		}
	}, [token, router, logout, isFetching]);

	useEffect(() => {
		if (!isFetching) {
			setPotes(potes);
		}
	}, [isFetching, potes]);

	return (
		<PoteContext.Provider value={{ potes: potesState ? potesState : [] }}>
			{children}
		</PoteContext.Provider>
	);
};

export const usePote = () => {
	const context = useContext(PoteContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
