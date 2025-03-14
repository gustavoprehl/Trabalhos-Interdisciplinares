"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
	const { logout } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src="https://avatar.vercel.sh/john" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="flex flex-row gap-1 items-center">
					<User size={16} />
					<span>Minha conta</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="flex flex-row gap-1 items-center">
					<Settings size={16} />
					<span>Configurações</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<Link href={"/admin/dashboard"}>
					<DropdownMenuItem className="flex flex-row gap-1 items-center">
						<User size={16} />
						<span>Dashboard (Admin)</span>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className="flex flex-row gap-1 items-center"
					onClick={handleLogout}
				>
					<LogOut size={16} />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
