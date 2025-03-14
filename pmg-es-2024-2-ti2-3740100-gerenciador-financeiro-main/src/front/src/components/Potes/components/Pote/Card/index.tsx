"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Pote } from "..";
import EditForm from "./components/Form";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import usePoteStore from "@/stores/potes";

interface CardProps extends Pote {
	total: number;
	disabled: boolean;
}

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

export default function CardPote(props: CardProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const { token, logout } = useAuth();
	const { updatePote } = usePoteStore((state) => state);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			...props,
			dataLimite: new Date(...(props.dataLimite as [number, number, number])),
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setSubmitting(true);
			form.clearErrors();

			const response = await api.put(
				`/pote/${props.id}`,
				JSON.stringify(values),
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setSubmitting(false);
			if (response.status === 204) {
				updatePote({
					id: props.id,
					...values,
					receitaMensal: values.receitaMensal ?? 1,
					dataLimite: [
						values.dataLimite.getFullYear(),
						values.dataLimite.getMonth(),
						values.dataLimite.getDay(),
					],
				});
				setOpen(false);
			}
		} catch (error) {
			if (isAxiosError(error)) {
				setSubmitting(false);
				if (error.status === 403) {
					logout();
				} else {
					form.setError("root", {
						message: "Erro inesperado durante atualização do pote.",
					});
				}
			}
		}
	};

	return (
		<div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Card
						className={cn(
							"w-full cursor-pointer select-none hover:bg-muted md:w-72",
							props.disabled ? "pointer-events-none" : "",
						)}
					>
						<CardHeader>
							<CardTitle>{props.nomePote}</CardTitle>
							<CardDescription>{props.metaPote}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex w-full items-end justify-center p-2">
								<span className="text-5xl font-bold tabular-nums">
									{Math.floor(props.total / 1000).toLocaleString()}k
								</span>
								<span className="text-muted-foreground">
									/{Math.floor(props.valorMeta / 1000)}k
								</span>
							</div>
						</CardContent>
						<CardFooter>
							<Progress value={(props.total / props.valorMeta) * 100} />
						</CardFooter>
					</Card>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Editar pote</DialogTitle>
						<DialogDescription>
							Altere os campos abaixo e clique em salvar para customizar seu
							pote.
						</DialogDescription>
					</DialogHeader>
					<FormProvider {...form}>
						<EditForm id={props.id} />
					</FormProvider>

					<div className="flex flex-row justify-between gap-4">
						<DialogClose asChild>
							<Button className="w-full" variant={"destructive"}>
								Cancelar
							</Button>
						</DialogClose>
						<Button className="w-full" onClick={form.handleSubmit(onSubmit)}>
							{isSubmitting ? (
								<LoaderCircle className="animate-spin" />
							) : (
								"Salvar"
							)}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
