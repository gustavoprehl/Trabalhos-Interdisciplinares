import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export default function Lastly() {
	const { control, formState } = useFormContext();

	return (
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
			{formState.errors.root?.message && (
				<p className="text-xs text-red-500">{formState.errors.root.message}</p>
			)}
		</div>
	);
}
