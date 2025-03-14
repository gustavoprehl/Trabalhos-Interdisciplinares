"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import useNotificacaoStore, { type Notificacao } from "@/stores/notificacoes";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotificationsDropdown() {
	const { token } = useAuth();
	const [notificacoesState, setNotificacoes] = useState<Notificacao[]>([]);
	const notificacoes = useNotificacaoStore((state) => state.notificacoes);

	useEffect(() => {
		setNotificacoes(notificacoes);
	}, [notificacoes]);

	const handleRead = async () => {
		const nArray = notificacoesState.map((n) => n.id);

		try {
			const response = await api.post(
				"/user/lerNotificacoes",
				JSON.stringify({ notificacoes: nArray }),
				{
					headers: {
						Authorization: token,
					},
				},
			);

			console.log(response.data);
		} catch (error) {
      console.error(error);
    }
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div>
					<div className="absolute ml-3 mb-3 text-[10px] bg-green-500 rounded-full w-4 flex justify-center items-center text-white font-semibold">
						{notificacoesState?.length ?? 0}
					</div>
					<Bell className="stroke-gray-800 dark:stroke-white" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[300px]">
				<DropdownMenuLabel asChild>
					<div className="flex w-full justify-between items-center">
						<span>Notificações</span>
						<button
							type="button"
							onClick={handleRead}
							className="text-[10px] text-green-600 cursor-pointer"
						>
							Marcar como lidas
						</button>
					</div>
				</DropdownMenuLabel>
				<p className="text-sm font-semibold p-2">
					{notificacoesState?.length > 0
						? notificacoesState.map((notifacacao: Notificacao) => {
								return (
									<div key={notifacacao.id}>
										<DropdownMenuItem>
											<div className="flex flex-row items-center">
												<DotFilledIcon
													color={
														notifacacao.tipoDeNotificacao === "sucesso"
															? "#1ca62a"
															: "fill-red-400"
													}
												/>
												<span className="text-xs">{notifacacao.mensagem}</span>
											</div>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
									</div>
								);
							})
						: "Sem notificações"}
				</p>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
