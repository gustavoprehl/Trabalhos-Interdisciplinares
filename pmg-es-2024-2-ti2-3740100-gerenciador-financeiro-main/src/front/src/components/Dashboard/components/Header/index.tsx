"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Bell, PiggyBank } from "lucide-react";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
import { NavLinks } from "./utils";
import Notifications from "./Notifications";

export default function Header() {
	return (
		<header className="px-4 lg:px-6 h-16 flex items-center justify-center transition-all duration-300 bg-background shadow-md">
			<div className="container max-w-6xl mx-auto flex items-center justify-between">
				<Link href={"/dashboard"}>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="w-40 md:w-96 flex items-center justify-center select-none cursor-pointer"
					>
						<PiggyBank className="h-8 w-8 text-green-600" />
						<span className="ml-2 text-md md:text-2xl font-bold bg-clip-text text-transparent bg-primary">
							Pote Manager
						</span>
					</motion.div>
				</Link>

				<div className="flex md:hidden gap-3">
					<motion.div
						key={"nav"}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						<div className="flex flex-row gap-3 items-center">
							<div className="cursor-pointer">
								<div className="absolute ml-3 mb-3 text-[10px] bg-green-500 rounded-full w-4 flex justify-center items-center text-white font-semibold">
									12
								</div>
								<Bell className="stroke-gray-800 dark:stroke-white" />
							</div>
							<UserDropdown />
						</div>
					</motion.div>
					<Sheet>
						<SheetTrigger>
							<HamburgerMenuIcon className="w-5 h-5 dark:stroke-primary" />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className="flex flex-col gap-3 dark:text-white">
								{NavLinks.map((item) => {
									return (
										<Link key={item.label} href={item.href}>
											<div className="flex flex-col border-l-8 border-l-primary rounded-l-md rounded cursor-pointer">
												<span className="m-2 font-medium">{item.label}</span>
											</div>
										</Link>
									);
								})}
							</div>
						</SheetContent>
					</Sheet>
				</div>
				<nav className="w-full hidden lg:flex gap-4 sm:gap-6 items-center justify-end pr-8">
					{NavLinks.map((item, index) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<Link href={item.href}>
								<span className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 transition-colors">
									{item.label}
								</span>
							</Link>
						</motion.div>
					))}
				</nav>
				<motion.div
					key={"nav"}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="hidden md:flex"
					transition={{ duration: 0.5, delay: 0.1 }}
				>
					<div className="hidden md:flex flex-row gap-3 items-center">
						<div className="cursor-pointer select-none">
							<Notifications />
						</div>
						<UserDropdown />
					</div>
				</motion.div>
			</div>
		</header>
	);
}
