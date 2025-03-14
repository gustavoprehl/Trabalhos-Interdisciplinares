import { BarChart2, Box, Goal, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordPullUp from "@/components/ui/word-pull-up";

export default function Features() {
	return (
		<section
			className="w-full py-14 md:py-24 lg:py-32 bg-background"
			id="features"
		>
			<div className="container max-w-6xl mx-auto px-4 md:px-6">
				<WordPullUp
					className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-black dark:text-white"
					words="Nossas funcionalidades"
				/>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
					{[
						{
							icon: BarChart2,
							title: "Rastreamento de Despesas",
							description:
								"Categorização e gerenciamento de despesas de forma facilitada.",
						},
						{
							icon: PieChart,
							title: "Projeção de futuros gastos",
							description:
								"Orçamentos adaptáveis ​​que evoluem com seus hábitos de gasto.",
						},
						{
							icon: Goal,
							title: "Criação de metas personalizadas",
							description:
								"Acelere seus objetivos com auxílio do sistema de metas personalizáveis.",
						},
						{
							icon: Box,
							title: "Insights e relatórios inteligentes",
							description:
								"Geração de relatórios e insights inteligentes sobre a sua evolução.",
						},
					].map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Card className="h-64 bg-background hover:brightness-95 transition-all cursor-pointer dark:hover:brightness-110">
								<CardHeader>
									<feature.icon className="h-12 w-12 text-primary mb-2" />
									<CardTitle className="text-xl font-bold">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-600">{feature.description}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
