import { PiggyBank } from "lucide-react";
import LoginForm from "./Form";
import Link from "next/link";

export default function LoginPage() {
	return (
		<div className="w-full h-screen flex flex-row justify-between">
			<div className="hidden md:flex w-1/2 h-screen absolute bg-black opacity-80 flex-row justify-center items-center gap-2 select-none">
				<PiggyBank className="w-12 h-12 stroke-primary" />
				<span className="text-primary text-5xl font-bold">Pote Manager</span>
			</div>
			<div className="hidden md:flex w-1/2 bg-primary bg-[url('/pexels-kunitsky-210990.jpg')] bg-center bg-cover" />
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2 text-center">
						<span className="text-pretty font-semibold text-xl">
							Entrar na sua conta
						</span>
						<span className="text-pretty text-muted-foreground font-semibold text-sm">
							Insira seus dados de acesso para entrar
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}
