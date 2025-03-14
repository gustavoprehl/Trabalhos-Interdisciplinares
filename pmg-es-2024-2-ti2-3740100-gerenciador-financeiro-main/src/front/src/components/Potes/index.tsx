import Header from "../Dashboard/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Potes from "./components/Pote";
import Utility from "./components/Utility";

export default function PotesLayout() {
	return (
		<div>
			<Header />
			<div className="m-8 md:m-14 lg:mx-40 lg:my-20">
				<Card>
					<CardHeader>
						<CardTitle>Gerenciamento de Potes</CardTitle>
					</CardHeader>
					<CardContent>
						<Utility />
						<Potes />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
