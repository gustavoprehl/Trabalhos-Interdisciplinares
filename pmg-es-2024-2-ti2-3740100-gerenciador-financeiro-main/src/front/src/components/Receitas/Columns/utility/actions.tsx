"use client";

import { useEffect, useState } from "react";
import { DeleteDialog, EditDialog } from "../components/dialogs";

export default function Actions({ id }: { id: number }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div className="flex flex-row gap-1">
			<DeleteDialog id={id} />
			<EditDialog id={id} />
		</div>
	);
}
