import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
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

export default function First() {
	const { control } = useFormContext();

	return (
		<div>
			<div>
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
			<div>
				<FormField
					control={control}
					name="categoria"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Categoria</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione uma categoria" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
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
		</div>
	);
}
