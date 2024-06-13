'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProject } from '@/lib/actions/todos';

const formSchema = z.object({
	title: z.string().min(1),
});

export const CreateNewTodos = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		startTransition(() => {
			createProject(values).then((data) => {
				console.log('[DATA FROM CREATE-NEW-TODOS] - ', data);
			});
		});
	};
	return (
		<Card className="w-[480px]">
			<CardHeader>
				<CardTitle>
					<Logo />
				</CardTitle>
				<CardDescription>Create a new project</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Project title</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Collage"
												type="text"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							Create
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
};
