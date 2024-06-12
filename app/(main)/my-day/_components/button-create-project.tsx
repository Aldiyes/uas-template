'use client';

import { Button } from '@/components/ui/button';
import { FiPlusCircle } from 'react-icons/fi';

// type Props = {
// 	children: React.ReactNode;
// };

export const ButtonCreateProject = () => {
	return (
		<Button>
			<FiPlusCircle className="mr-2 h-4 w-4" />
			Create a projects
		</Button>
	);
};
