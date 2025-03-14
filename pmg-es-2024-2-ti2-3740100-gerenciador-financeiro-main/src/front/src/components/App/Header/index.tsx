"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-16 flex items-center justify-center transition-all duration-300 bg-background  ${isScrolled ? "md:bg-background shadow-md" : "md:bg-transparent"}`}
		>
			<div className="container max-w-6xl mx-auto flex items-center justify-between">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex items-center justify-center select-none"
				>
					<PiggyBank className="h-8 w-8 text-green-600" />
					<span className="ml-2 text-md md:text-2xl font-bold bg-clip-text text-transparent bg-primary">
						Pote Manager
					</span>
				</motion.div>
				<nav className="hidden lg:flex gap-4 sm:gap-6 items-center">
					{["Funcionalidades", "Sobre", "Contato"].map((item, index) => (
						<motion.a
							key={item}
							href={index === 0 ? "#features" : ""}
							className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 transition-colors"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							{item}
						</motion.a>
					))}
					<motion.div
						key={"login"}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
					>
						<Link href={"/cadastro"}>
							<Button variant={"secondary"} className="select-none">Cadastrar</Button>
						</Link>
					</motion.div>
					<motion.div
						key={"login"}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<Link href={"/entrar"}>
							<Button className="select-none">Entrar</Button>
						</Link>
					</motion.div>
				</nav>
				<div className="flex lg:hidden">
					<Sheet>
						<SheetTrigger>
							<HamburgerMenuIcon className="w-5 h-5 dark:stroke-primary" />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-3 dark:text-white">
								<div className="flex flex-col border-l-8 border-l-primary rounded-l-md rounded cursor-pointer">
									<span className="m-2 font-medium">Funcionalidades</span>
								</div>
								<div className="flex flex-col border-l-8 border-l-primary rounded-l-md rounded cursor-pointer">
									<span className="m-2 font-medium">Sobre</span>
								</div>
								<div className="flex flex-col border-l-8 border-l-primary rounded-l-md  rounded cursor-pointer">
									<span className="m-2 font-medium">Contato</span>
								</div>
							</div>
							<div className="flex flex-col gap-2 pt-4 w-full">
								<Link href={"/cadastro"}>
									<Button variant={"secondary"} className="w-full">
										Cadastrar
									</Button>
								</Link>

								<Link href={"/entrar"}>
									<Button className="w-full">Entrar</Button>
								</Link>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
