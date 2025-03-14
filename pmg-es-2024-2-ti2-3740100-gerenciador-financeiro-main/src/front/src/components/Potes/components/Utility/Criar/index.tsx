"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, LoaderCircle, PackagePlus } from "lucide-react";
import { useState } from "react";
import First from "./Etapas/first";
import Second from "./Etapas/second";
import Third from "./Etapas/third";
import Lastly from "./Etapas/lastly";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import usePoteStore from "@/stores/potes";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	nomePote: z
		.string({ message: "Nome inválido." })
		.min(1, { message: "Nome precisa ter no mínimo 1 caractere." })
		.max(50, { message: "Nome precisa ter no máximo 50 caracteres." }),
	categoria: z
		.string({ message: "Categoria inválida." })
		.min(1, { message: "Categoria precisa ter no mínimo 1 caractere." })
		.max(50, { message: "Categoria precisa ter no máximo 50 caracteres." }),
	valorInicial: z
		.number({ message: "Valor inicial inválido." })
		.min(1, { message: "Valor inicial mínimo de R$1,00." }),
	metaPote: z
		.string({ message: "Meta inválida." })
		.min(1, { message: "Meta precisa precisa ter no mínimo 1 caractere." }),
	valorMeta: z
		.number({ message: "Valor da meta inválido." })
		.min(1, { message: "Valor da meta mínimo de R$1,00." }),
	dataLimite: z.date({ message: "Data inválida." }),
	receitaMensal: z.number({ message: "Receita mensal inválida." }).optional(),
});

export default function CriarPote() {
	const [open, setOpen] = useState(false);
	const [stage, setStage] = useState(0);
	const [isSubmitting, setSubmitting] = useState(false);
	const addPote = usePoteStore((state) => state.addPote);
	const { token } = useAuth();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nomePote: "",
			categoria: "",
			valorInicial: 0,
			metaPote: "",
			valorMeta: 0,
			dataLimite: new Date(),
			receitaMensal: 0,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const {
			nomePote,
			categoria,
			valorInicial,
			metaPote,
			valorMeta,
			dataLimite,
			receitaMensal,
		} = values;

		try {
			const response = await api.post(
				"/pote",
				JSON.stringify({
					nomePote,
					categoria,
					valorInicial,
					metaPote,
					valorMeta,
					dataLimite,
					receitaMensal,
				}),
				{
					headers: {
						authorization: token,
					},
				},
			);

			setSubmitting(false);

			if (response.status === 200) {
				addPote(response.data)
				setOpen(false);
			}
		} catch (error) {
			form.reset();
			form.setError("root", {
				message: "Erro não esperado durante criação do pote.",
			});
			console.error(error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="flex flex-row gap-1 items-center">
					<PackagePlus size={16} />
					<span>Criar novo</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Criar um novo pote</DialogTitle>
					<DialogDescription>Etapa {stage + 1} de 4</DialogDescription>
				</DialogHeader>
				<FormProvider {...form}>
					{stage === 0 && <First />}
					{stage === 1 && <Second />}
					{stage === 2 && <Third />}
					{stage === 3 && <Lastly />}
				</FormProvider>
				<DialogFooter className="sm:justify-start">
					<div className="w-full flex justify-between gap-4">
						{stage === 0 && (
							<DialogClose asChild>
								<Button
									type="button"
									variant="destructive"
									className="w-full"
									onClick={() => setStage(0)}
								>
									Cancelar
								</Button>
							</DialogClose>
						)}
						{stage !== 0 && (
							<Button
								type="button"
								variant="secondary"
								className="w-full"
								onClick={() => setStage(stage - 1)}
							>
								Voltar
							</Button>
						)}
						{stage !== 3 && (
							<Button
								type="button"
								className="w-full flex flex-row gap-1 items-center"
								onClick={() => setStage(stage + 1)}
							>
								<span>Próximo</span>
								<ArrowRight size={16} />
							</Button>
						)}
						{stage === 3 && (
							<Button
								type="button"
								className="w-full flex flex-row gap-1 items-center"
								onClick={form.handleSubmit(onSubmit)}
							>
								{isSubmitting ? (
									<LoaderCircle className="animate-spin" />
								) : (
									<span>Criar</span>
								)}
							</Button>
						)}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
