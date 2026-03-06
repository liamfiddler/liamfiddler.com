'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24 text-center">
			<h2 className="text-3xl font-bold">Something went wrong!</h2>
			<p className="mt-4 text-zinc-600">500 - Internal Server Error</p>
			<button
				onClick={() => reset()}
				className="mt-8 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Try again
			</button>
		</div>
	);
}
