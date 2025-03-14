"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { LoaderCircle, Trash2, Wrench } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import useReceitaStore from "@/stores/receitas";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useReceita } from "@/contexts/ReceitaContext";

export const DeleteDialog = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false);
	const { token } = useAuth();
	const [error, setError] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);
	const { removeReceita } = useReceitaStore((state) => state);

	const handleDelete = async () => {
		try {
			setSubmitting(true);
			const response = await api.delete(`/receitas/${id}`, {
				headers: {
					Authorization: token,
				},
			});

			setSubmitting(false);

			if (response.status === 204) {
				removeReceita(id);
				setOpen(false);
			}
		} catch (error) {
			setSubmitting(false);
			setError("Erro inesperado durante remoção da receita.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive" size="icon">
					<Trash2 size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Deseja remover essa receita?</DialogTitle>
					<DialogDescription>
						Essa ação não pode ser desfeita.
					</DialogDescription>
				</DialogHeader>
				<div>
					<div className="w-full">
						<span className="text-sm text-red-500">{error}</span>
					</div>
					<div className="flex flex-row gap-2 justify-between">
						<DialogClose asChild>
							<Button className="w-2/6" variant="secondary">
								Cancelar
							</Button>
						</DialogClose>
						<div className="w-2/6">
							<Button
								className="w-full"
								variant="destructive"
								onClick={handleDelete}
							>
								{isSubmitting ? (
									<LoaderCircle className="animate-spin" />
								) : (
									"Apagar"
								)}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const formSchema = z.object({
	valor: z
		.number({ message: "Valor deve ser um número" })
		.min(1, { message: "Valor mínimo de R$1,00." }),
	tipoReceita: z
		.string({
			message: "Tipo de entrada inválido.",
		})
		.refine((arg) => arg === "entrada" || arg === "saida", {
			message: "Tipo de entrada inválido.",
		}),
	categoria: z.string().min(1, { message: "Categoria inválida." }),
	descricao: z.string().optional(),
});

export const EditDialog = ({ id }: { id: number }) => {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const { token, logout } = useAuth();
	const { updateReceita } = useReceitaStore((state) => state);
	const { receitas } = useReceita();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			valor: 0,
			tipoReceita: "entrada",
			categoria: "",
			descricao: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const receita = receitas.find((receita) => receita.id === id);

		try {
			setSubmitting(true);
			form.clearErrors();

			const response = await api.put(
				`/receitas/${id}`,
				JSON.stringify({
					id: id,
					categoria: values.categoria,
					descricao: values.descricao ? values.descricao : "",
					tipoReceita: values.tipoReceita,
					valor: values.valor,
					criadoEm: receita?.criadoEm,
					poteId: receita?.poteId,
				}),
				{
					headers: {
						Authorization: token,
					},
				},
			);

			setSubmitting(false);
			if (response.status === 204) {
				if (receita) {
					updateReceita({
						id: id,
						categoria: values.categoria,
						descricao: values.descricao ? values.descricao : "",
						tipoReceita: values.tipoReceita,
						valor: values.valor,
						criadoEm: receita.criadoEm,
						poteId: receita.poteId,
					});
					setOpen(false);
				}
			}
		} catch (error) {
			if (isAxiosError(error)) {
				setSubmitting(false);
				if (error.status === 403) {
					logout();
				} else {
					form.setError("root", {
						message: "Erro inesperado durante atualização da receita.",
					});
				}
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<Wrench size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Criar nova receita</DialogTitle>
					<DialogDescription>
						Utilize os campos abaixo para criar uma nova receita.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<div>
						<div>
							<FormField
								control={form.control}
								name="valor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Valor</FormLabel>
										<FormControl>
											<NumericFormat
												prefix="R$ "
												customInput={Input}
												thousandSeparator
												decimalSeparator="."
												decimalScale={2}
												fixedDecimalScale
												onValueChange={(v) => {
													field.onChange(Number.parseInt(v.value, 10));
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="tipoReceita"
								render={({ field: { ref, ...restField } }) => (
									<FormItem>
										<FormLabel>Tipo de entrada</FormLabel>
										<Select
											onValueChange={restField.onChange}
											defaultValue={restField.value}
											required
											{...restField}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue ref={ref} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="entrada">
														<h1 className="text-primary">Entrada</h1>
													</SelectItem>
													<SelectItem value="saida">
														<h1 className="text-red-500">Saída</h1>
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full">
							<FormField
								control={form.control}
								name="categoria"
								render={({ field: { ref, ...restField } }) => (
									<FormItem>
										<FormLabel>Categoria</FormLabel>
										<Select
											onValueChange={restField.onChange}
											defaultValue={restField.value}
											required
											{...restField}
										>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue ref={ref} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="geral">Geral</SelectItem>
													<SelectItem value="alimentacao">
														Alimentação
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div>
							<FormField
								control={form.control}
								name="descricao"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Descricação</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<span className="text-sm text-red-400">
							{form.formState.errors.root?.message}
						</span>
					</div>
				</Form>
				<div className="flex flex-row gap-2 justify-between">
					<DialogClose asChild>
						<Button className="w-2/6" variant="secondary">
							Cancelar
						</Button>
					</DialogClose>
					<div className="w-2/6">
						<Button
							type="submit"
							onClick={form.handleSubmit(onSubmit)}
							className="w-full"
						>
							{isSubmitting ? (
								<LoaderCircle className="animate-spin" />
							) : (
								"Salvar"
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
