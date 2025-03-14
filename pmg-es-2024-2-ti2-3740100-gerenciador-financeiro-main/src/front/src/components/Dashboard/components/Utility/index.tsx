import Categorias from "./Categorias";
import FiltrarDashboard from "./Filters";

export default function Utility() {
	return (
		<div className="w-full flex flex-col gap-4 md:flex-row items-center justify-start md:justify-between">
			<Categorias />
			<div className="w-full flex md:w-fit md:flex-row gap-4 justify-start">
				<FiltrarDashboard />
			</div>
		</div>
	);
}