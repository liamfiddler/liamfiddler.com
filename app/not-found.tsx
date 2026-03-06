import PageTransitionLink from '@/components/PageTransitionLink';

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
			<h1 className="text-6xl font-bold">404</h1>
			<p className="mt-4 text-xl text-zinc-600">Page not found</p>
			<PageTransitionLink
				href="/"
				className="mt-8 text-blue-600 hover:underline"
			>
				Go back home
			</PageTransitionLink>
		</div>
	);
}
