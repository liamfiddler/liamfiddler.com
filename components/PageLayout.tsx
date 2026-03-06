import HeaderLink from '@/components/HeaderLink';
import PageTransitionLink from '@/components/PageTransitionLink';
import Logo from '@/components/Logo';
import { cn } from '@sglara/cn';
import AnchorLink from './AnchorLink';
import { Link } from 'next-view-transitions';

export default function PageLayout({
	children,
	bg = 'red',
	className = '',
	id = 'top',
	style = {},
	...props
}: React.ComponentProps<'div'> & { bg?: string }) {
	const styles = {
		'--bg-color': bg,
		backgroundColor: bg,
		...style,
	} as React.CSSProperties;

	return (
		<>
			<div
				className={cn('page-layout flex flex-col min-h-dvh text-inverted relative z-2 mb-48 pb-32', className)}
				style={styles}
				id={id}
				{...props}
			>
				<header>
					<nav className="relative z-5 flex gap-6 py-8 px-10 items-center">
						<PageTransitionLink
							animation="circle"
							href="/"
							className="font-bold mr-auto text-2xl -ml-1.5"
						>
							<Logo />
						</PageTransitionLink>
						<HeaderLink href="/">About</HeaderLink>
						<HeaderLink href="/blog">Blog</HeaderLink>
						<HeaderLink href="/projects">Projects</HeaderLink>
					</nav>
				</header>
				<main className="flex flex-col flex-grow h-full">{children}</main>
			</div>
			<footer className="fixed z-1 bottom-0 h-48 w-full flex gap-8 px-10 items-center bg-black-100 text-gray-500">
				<div className="flex">
					<PageTransitionLink
						animation="circle"
						href="/#top"
						className="font-bold mr-auto text-2xl -ml-1.5"
					>
						<Logo />
					</PageTransitionLink>
				</div>
				<div>
					<p>&copy; {new Date().getFullYear()} Liam Fiddler</p>
					<p><Link href="https://github.com/liamfiddler" target="_blank" rel="noopener noreferrer">GitHub</Link> &bull; <Link href="https://www.linkedin.com/in/liamfiddler/" target="_blank" rel="noopener noreferrer">LinkedIn</Link></p>
				</div>
				<AnchorLink href={`#${id}`} className="ml-auto"><span className="hidden md:inline">Back to </span>Top &uarr;</AnchorLink>
			</footer>
		</>
	);
}
