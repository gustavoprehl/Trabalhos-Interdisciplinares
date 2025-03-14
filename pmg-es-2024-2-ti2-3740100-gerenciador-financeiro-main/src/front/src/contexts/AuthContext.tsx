"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface AuthContextType {
	token: string;
	authenticate: (jwtToken: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
	const [token, setToken] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		if (cookies.auth_token) {
			setToken(cookies.auth_token);
		}
	}, [cookies]);

	const authenticate = (jwtToken: string) => {
		try {
			setCookie("auth_token", jwtToken, {
				path: "/",
				maxAge: 1000 * 60 * 60 * 24,
			});
			setToken(jwtToken);
			router.push("/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	const logout = () => {
		removeCookie("auth_token", { path: "/" });
		setToken("");
	};

	return (
		<AuthContext.Provider value={{ token, authenticate, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
