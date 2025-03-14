"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { isAxiosError } from "axios";
import { api } from "@/lib/api";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z
		.string({ message: "E-mail inválido." })
		.email({ message: "E-mail inválido." }),
	password: z
		.string({ message: "Senha inválida." })
		.min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
});

export default function SignUpForm() {
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const { email, password } = values;
		setSubmitting(true);

		try {
			const request = await api.post(
				"/user",
				JSON.stringify({
					email,
					password,
				}),
			);

			setSubmitting(false);

			if (request.status === 201) {
				form.reset();
				router.push("/entrar");
			} else {
				form.setError("root", { message: "Erro durante criação de usuário." });
			}
		} catch (error) {
			setSubmitting(false);
			if (isAxiosError(error)) {
				if (error.response?.data.message?.includes("Duplicate entry")) {
					return form.setError("email", { message: "E-mail já cadastrado." });
				}
			}

			form.reset();
			form.setError("root", {
				message: "Erro não esperado durante criação de usuário.",
			});
			console.error(error);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="w-full pb-2">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
				{form.formState.errors.root && (
					<p className="text-red-500 text-xs">
						{form.formState.errors.root.message}
					</p>
				)}
				<div className="pt-2">
					<Button type="submit" className="w-full">
						{isSubmitting ? <LoaderCircle className="animate-spin" /> : "Criar"}
					</Button>
				</div>
				<Link href={"/entrar"}>
					<span className="text-xs text-green-600 font-semibold cursor-pointer">
						Já possui uma conta?
					</span>
				</Link>
			</form>
		</Form>
	);
}
