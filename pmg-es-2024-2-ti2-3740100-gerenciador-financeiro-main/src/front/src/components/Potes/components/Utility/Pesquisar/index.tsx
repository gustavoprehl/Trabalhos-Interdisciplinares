import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Pesquisar() {
	return (
		<div className="relative flex items-center w-full lg:w-96">
			<MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
			<Input placeholder="Pesquisar" className="pl-8" />
		</div>
	);
}
