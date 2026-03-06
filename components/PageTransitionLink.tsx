'use client';

import { Link } from 'next-view-transitions';

const TRANSITION_STYLES = ['slide', 'circle'] as const;

type PageTransitionAnimation = (typeof TRANSITION_STYLES)[number];

type Props = React.ComponentProps<typeof Link> & {
	animation?: PageTransitionAnimation;
};

export default function PageTransitionLink(props: Props) {
	const { onClick = () => {}, animation = 'slide', ...rest } = props;

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const docElem = document.documentElement;

		if (!docElem.classList.contains(animation)) {
			docElem.classList.remove(...TRANSITION_STYLES);
			docElem.classList.add(animation);
		}

		docElem.style.setProperty('--page-transition-x', e.clientX + 'px');
		docElem.style.setProperty('--page-transition-y', e.clientY + 'px');
		onClick(e);
	};

	return <Link onClick={handleClick} {...rest} />;
}
