import { NotificacaoProvider } from "@/contexts/NotificacaoContext";
import { PoteProvider } from "@/contexts/PoteContext";
import { ReceitaProvider } from "@/contexts/ReceitaContext";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<main>
					<NuqsAdapter>
						<NotificacaoProvider>
							<PoteProvider>
								<ReceitaProvider>{children}</ReceitaProvider>
							</PoteProvider>
						</NotificacaoProvider>
					</NuqsAdapter>
				</main>
			</body>
		</html>
	);
}
