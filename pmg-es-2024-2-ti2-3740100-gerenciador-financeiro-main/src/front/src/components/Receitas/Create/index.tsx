"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import usePoteStore from "@/stores/potes";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useReceitaStore from "@/stores/receitas";

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
	poteId: z
		.string()
		.min(1, { message: "Pote inválido." })
		.refine((arg: string) => Number.parseInt(arg, 10)),
});

export const CreateDialog = () => {
	const [open, setOpen] = useState(false);
	const [ísSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const { token, logout } = useAuth();
	const potes = usePoteStore((state) => state.potes);
	const { addReceita } = useReceitaStore((state) => state);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			valor: 0,
			tipoReceita: "entrada",
			categoria: "",
			descricao: "",
			poteId: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		form.clearErrors();
		try {
			setSubmitting(true);
			const response = await api.post(
				"/receitas",
				JSON.stringify({
					...values,
				}),
				{
					headers: {
						Authorization: token,
					},
				},
			);
			setSubmitting(false);

			if (response.status === 200) {
				addReceita({ ...response.data });
				setOpen(false);
			}
		} catch (error) {
			setSubmitting(false);
			if (isAxiosError(error)) {
				if (error.status === 403) {
					logout();
					router.push("/");
				}
			} else {
				form.setError("root", {
					message: "Erro inesperado durante criação de receita.",
				});
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="flex flex-row gap-1 items-center">
					<Button>
						<PlusIcon size={16} />
						Adicionar
					</Button>
				</div>
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
						<div className="w-full">
							<FormField
								control={form.control}
								name="poteId"
								render={({ field: { ref, ...restField } }) => (
									<FormItem>
										<FormLabel>Pote</FormLabel>
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
													{potes.map((pote) => (
														<SelectItem value={String(pote.id)} key={pote.id}>
															{pote.nomePote}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</Form>
				<span className="text-sm text-red-400">
					{form.formState.errors.root?.message}
				</span>
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
							{ísSubmitting ? (
								<LoaderCircle className="animate-spin" />
							) : (
								"Criar"
							)}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
