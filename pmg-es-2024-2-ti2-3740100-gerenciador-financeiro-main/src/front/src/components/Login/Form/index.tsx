"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { api } from "@/lib/api";
import { HttpStatusCode, isAxiosError } from "axios";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
	email: z
		.string({ message: "E-mail inválido." })
		.email({ message: "E-mail inválido." }),
	password: z
		.string({ message: "Senha inválida." })
		.min(8, { message: "Senha inválida." }),
});

export default function LoginForm() {
	const [isSubmitting, setSubmitting] = useState(false);
	const { authenticate } = useAuth();
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
			const response = await api.post(
				"/login",
				JSON.stringify({
					email,
					password,
				}),
			);

			setSubmitting(false);

			if (response.status === 200 && response.headers) {
				if (response.headers.authorization) {
					authenticate(response.headers.authorization);
				} else {
					form.setError("root", { message: "Erro durante autenticação." });
				}
			} else {
				form.setError("root", { message: "Erro durante autenticação." });
			}
		} catch (error) {
			setSubmitting(false);
			if (isAxiosError(error)) {
				if (error.status === HttpStatusCode.Unauthorized) {
					form.setError("root", {
						message: "E-mail ou senha inválidos.",
					});
					return console.error(error);
				}
			}

			form.reset();
			form.setError("root", {
				message: "Erro não esperado durante criação de usuário.",
			});
			console.error(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<div className="w-80">
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
				<div className="w-80 pb-2">
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
				{form.formState.errors.root && (
					<p className="text-red-500 text-xs">
						{form.formState.errors.root.message}
					</p>
				)}
				<Button className="w-full pt-2">
					{isSubmitting ? <LoaderCircle className="animate-spin" /> : "Entrar"}
				</Button>
			</form>
		</Form>
	);
}
