'use client';

import { useState, useEffect } from 'react';

const COMMON_PORTS = [
	{ value: 80, label: 'HTTP :80' },
	{ value: 443, label: 'HTTPS :443' },
	{ value: 3000, label: 'Next.js, Angular :3000' },
	{ value: 8000, label: 'Apache :8000' },
	{ value: 8080, label: 'Vue, Vite, Eleventy :8080' },
	{ value: 1234, label: 'Parcel :1234' },
];

export default function KillProcessCommand() {
	const [port, setPort] = useState<number>(80);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		const command = `lsof -nti:${port} | xargs kill -9`;

		try {
			setIsSubmitting(true);
			await navigator.clipboard.writeText(command);
		} catch (err) {
			console.error('Failed to copy command: ', err);
		}
	};

	useEffect(() => {
		if (isSubmitting) {
			let isMounted = true;

			const timer = setTimeout(() => {
				if (isMounted) {
					setIsSubmitting(false);
				}
			}, 3000);

			return () => {
				isMounted = false;
				clearTimeout(timer);
			};
		}
	}, [isSubmitting]);

	return (
		<div className="not-prose my-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
			<form
				onSubmit={handleSubmit}
				className="flex flex-wrap items-center gap-4"
			>
				<div className="flex items-center gap-2">
					<label
						htmlFor="port"
						className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
					>
						Port #
					</label>
					<input
						type="number"
						name="port"
						id="port"
						list="common-ports"
						value={port}
						onChange={(e) => setPort(Number(e.target.value))}
						required
						className="w-28 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
					/>
				</div>
				<code className="hidden flex-1 overflow-x-auto rounded bg-zinc-200 px-2 py-1 text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 sm:block">
					lsof -nti:{port} | xargs kill -9
				</code>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`min-w-[100px] rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 ${
						isSubmitting
							? 'bg-green-600 text-white shadow-inner'
							: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:opacity-70'
					}`}
				>
					{isSubmitting ? (
						<span className="flex items-center justify-center gap-2">
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							Copied!
						</span>
					) : (
						'Copy Command'
					)}
				</button>
			</form>

			<datalist id="common-ports">
				{COMMON_PORTS.map((p) => (
					<option key={p.value} value={p.value}>
						{p.label}
					</option>
				))}
			</datalist>
		</div>
	);
}
