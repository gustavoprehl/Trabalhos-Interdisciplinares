import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function Subscribe() {
	return (
		<section className="w-full py-8 md:py-18 lg:py-24 bg-background">
			<div className="container max-w-6xl mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-2 flex flex-col justify-center items-center text-center"
					>
						<BoxReveal boxColor={"#16a34a"} duration={0.5}>
							<h2 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-lime-500/80">
								Transforme sua vida financeira
							</h2>
						</BoxReveal>

						<BoxReveal boxColor={"#16a34a"} duration={0.5}>
							<p className="mx-auto max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-2xl/relaxed dark:text-gray-400">
								Participe da revolução financeira e assuma o controle do seu
								dinheiro como nunca antes!
							</p>
						</BoxReveal>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="w-full max-w-sm space-y-2"
					>
						<BoxReveal boxColor={"#16a34a"} duration={0.5}>
							<div className="flex flex-col gap-2">
								<div className="flex flex-row gap-2 pt-1 pl-1">
									<Input
										placeholder="Seu e-mail"
										type="email"
									/>
									<Button type="submit">Começar</Button>
								</div>
								<p className="text-xs text-gray-600">
									Ao se cadastrar, você concorda com os nossos{" "}
									<a
										href="/terms"
										className="underline underline-offset-2 hover:text-green-600"
									>
										Termos de serviço.
									</a>
								</p>
							</div>
						</BoxReveal>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
