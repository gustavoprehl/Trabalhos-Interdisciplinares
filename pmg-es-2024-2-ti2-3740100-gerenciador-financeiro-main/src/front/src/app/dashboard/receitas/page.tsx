import ReceitasLayout from "@/components/Receitas";
import { Suspense } from "react";

export default function Receitas() {
	return (
		<Suspense>
			<ReceitasLayout />
		</Suspense>
	);
}
