import { PiggyBank } from "lucide-react";
import SignUpForm from "./Form";

export default function SignUp() {
	return (
		<div className="w-full h-screen flex flex-row justify-between">
			<div className="hidden md:flex w-1/2 h-screen absolute bg-black opacity-80 flex-row justify-center items-center gap-2 select-none">
				<PiggyBank className="w-12 h-12 stroke-primary" />
				<span className="text-primary text-5xl font-bold">Pote Manager</span>
			</div>
			<div className="hidden md:flex w-1/2 bg-primary bg-[url('/pexels-karolina-grabowska-4475523.jpg')] bg-center bg-cover" />
			<div className="w-full md:w-1/2 flex justify-center items-center">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2 text-center">
						<span className="text-pretty font-semibold text-xl">
							Criar uma conta
						</span>
					</div>
					<div className="flex flex-col gap-2">
						<SignUpForm />
					</div>
				</div>
			</div>
		</div>
	);
}
