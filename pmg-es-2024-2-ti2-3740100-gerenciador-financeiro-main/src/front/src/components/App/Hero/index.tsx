import DotPattern from "@/components/ui/dot-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 select-none">
			<div className="container max-w-6xl mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<DotPattern
						className={cn(
							"[mask-image:radial-gradient(500px_circle_at_top,white,transparent)] lg:[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
						)}
					/>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-2"
					>
						<h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-primary to-lime-500/80 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900">
							Controle seu dinheiro
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-xl/relaxed lg:text-2xl/relaxed xl:text-3xl/relaxed dark:text-gray-400">
							Crie projeções, metas, controle de despesas, de forma
							totalmente gratuita.
						</p>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-x-4"
					>
						<Link href={"/cadastro"}>
							<ShimmerButton className="shadow-2xl">
								<span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
									Começar agora
								</span>
							</ShimmerButton>
						</Link>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
