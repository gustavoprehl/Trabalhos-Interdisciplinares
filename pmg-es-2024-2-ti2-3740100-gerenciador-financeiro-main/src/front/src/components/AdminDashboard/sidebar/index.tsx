"use client";

import { BarChart2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
	{ icon: BarChart2, label: "Analytics", href: "/admin/dashboard" },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
			<div className="flex items-center mb-8">
				<div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
					<span className="text-white font-bold">A</span>
				</div>
				<span className="ml-3 text-xl font-bold">Admin</span>
			</div>

			<nav className="space-y-1">
				{menuItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center px-4 py-3 text-sm font-medium rounded-lg",
								pathname === item.href
									? "bg-green-50 text-green-600"
									: "text-gray-700 hover:bg-gray-50",
							)}
						>
							<Icon className="w-5 h-5 mr-3" />
							{item.label}
						</Link>
					);
				})}
			</nav>

			<div className="mt-auto pt-8 space-y-1">
				<button
					type="button"
					className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
				>
					<LogOut className="w-5 h-5 mr-3" />
					Sair
				</button>
			</div>
		</div>
	);
}
