'use client';

import { usePathname } from 'next/navigation';
import PageTransitionLink from '@/components/PageTransitionLink';
import { cn } from '@sglara/cn';

function getStringBetweenFirstAndSecondSlashes(str: string) {
	return str.replace(/\/$/, '').replace(/^\//, '').split('/')[0];
}

type Props = Omit<React.ComponentProps<typeof PageTransitionLink>, 'animation'>;

export default function HeaderLink(props: Props) {
	const { className, ...rest } = props;
	const pathname = usePathname();
	const isActive =
		getStringBetweenFirstAndSecondSlashes(pathname) ===
		getStringBetweenFirstAndSecondSlashes(props.href.toString());

	return (
		<PageTransitionLink
			className={cn(
				className,
				'relative text-inverse -mt-3',
				'after:opacity-0 after:absolute after:top-full after:mt-3 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-current after:transition-all after:duration-300 after:ease-in-out',
				'hover:after:opacity-100 hover:after:mt-2',
				'focus:after:opacity-100 focus:after:mt-2',
				isActive && 'after:opacity-100 after:mt-2'
			)}
			animation="circle"
			{...rest}
		/>
	);
}
