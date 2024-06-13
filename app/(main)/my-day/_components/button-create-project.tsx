'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FiPlusCircle } from 'react-icons/fi';
import { CreateNewTodos } from './create-new-todos';

export const ButtonCreateProject = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<FiPlusCircle className="mr-2 h-4 w-4" />
					Create a projects
				</Button>
			</DialogTrigger>
			<DialogContent className="w-auto border-none bg-transparent p-0">
				<CreateNewTodos />
			</DialogContent>
		</Dialog>
	);
};
