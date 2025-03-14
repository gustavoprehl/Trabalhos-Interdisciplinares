"use client";

import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function EditForm({ id }: { id: number }) {
	const { control, getValues, formState } = useFormContext();

	const categoria = getValues("categoria");
	const valorInicial = getValues("valorInicial");
	const valorMeta = getValues("valorMeta");
	const receitaMensal = getValues("receitaMensal");

	return (
		<div>
			<div className="flex w-full flex-row justify-between gap-4">
				<div className="w-1/2">
					<FormField
						control={control}
						name="nomePote"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome do pote</FormLabel>
								<FormControl>
									<Input type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-1/2">
					<FormField
						control={control}
						name="categoria"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categoria</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione uma categoria" />
										</SelectTrigger>
									</FormControl>
									<SelectContent defaultValue={categoria}>
										<SelectItem value="default">Sem categoria</SelectItem>
										<SelectItem value="carro">Carro</SelectItem>
										<SelectItem value="viagem">Viagem</SelectItem>
										<SelectItem value="casa">Casa</SelectItem>
										<SelectItem value="outros">Outros</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
			<div>
				<FormField
					control={control}
					name="valorInicial"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor inicial</FormLabel>
							<FormControl>
								<NumericFormat
									prefix="R$ "
									customInput={Input}
									thousandSeparator
									decimalSeparator="."
									decimalScale={2}
									fixedDecimalScale
									defaultValue={valorInicial}
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
			<FormField
				control={control}
				name="metaPote"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Meta do pote</FormLabel>
						<FormControl>
							<Input type="text" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div>
				<FormField
					control={control}
					name="valorMeta"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor da meta</FormLabel>
							<FormControl>
								<NumericFormat
									prefix="R$ "
									customInput={Input}
									thousandSeparator
									decimalSeparator="."
									decimalScale={2}
									defaultValue={valorMeta}
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
			<div className="flex flex-col gap-1 pt-1">
				<FormField
					control={control}
					name="dataLimite"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Data limite</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value ? (
												format(field.value, "PPP", { locale: ptBR })
											) : (
												<span>Escolha uma data</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date < new Date() || date < new Date("1900-01-01")
										}
										className="bg-white rounded-b-lg"
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div>
				<FormField
					control={control}
					name="receitaMensal"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Receita mensal</FormLabel>
							<FormControl>
								<NumericFormat
									prefix="R$ "
									customInput={Input}
									thousandSeparator
									decimalSeparator="."
									defaultValue={receitaMensal}
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
			<div className="flex flex-col pt-2">
				<Label htmlFor="nome">Entradas e Despesas</Label>
				<Link
					href={`/dashboard/receitas?filterBy=pote&poteId=${id}`}
				>
					<span className="cursor-pointer text-xs font-semibold text-green-600">
						Clique aqui para editar
					</span>
				</Link>
			</div>
			{formState.errors.root?.message && (
				<div>
					<span className="text-sm text-red-400">
						{formState.errors.root?.message}
					</span>
				</div>
			)}
		</div>
	);
}
