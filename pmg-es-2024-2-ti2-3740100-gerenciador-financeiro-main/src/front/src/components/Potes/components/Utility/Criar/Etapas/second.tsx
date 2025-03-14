import { Input } from "@/components/ui/input";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export default function Second() {
	const { control } = useFormContext();

	return (
		<div>
			<div>
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
			</div>
			<div>
				<FormField
					control={control}
					name="valorMeta"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Valor da Meta</FormLabel>
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
