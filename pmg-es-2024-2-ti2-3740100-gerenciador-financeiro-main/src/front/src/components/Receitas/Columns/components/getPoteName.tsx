"use client";

import type { Pote } from "@/components/Potes/components/Pote";
import usePoteStore from "@/stores/potes";
import { useEffect, useState } from "react";

export default function GetPoteName({ id }: { id: number }) {
	const potes = usePoteStore((state) => state.potes);
	const [potesState, setPotes] = useState<Pote[]>();

	useEffect(() => {
		setPotes(potes);
	}, [potes]);

	return <span>{potesState?.find((pote) => pote.id === id)?.nomePote}</span>;
}
