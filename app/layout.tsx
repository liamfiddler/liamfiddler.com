import type { Metadata } from 'next';
import { Geist, Geist_Mono, Titan_One } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	weight: 'variable',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const titanOne = Titan_One({
	variable: '--font-titan-one',
	weight: '400',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Liam Fiddler',
	description: 'Personal website of Liam Fiddler',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="en" data-scroll-behavior="smooth" className="overscroll-none scroll-smooth text-size-adjust-none scrollbar-stable">
				<body
					className={`${geistSans.variable} ${geistMono.variable} ${titanOne.variable} antialiased min-h-dvh font-sans`}
				>
					{children}
				</body>
			</html>
		</ViewTransitions>
	);
}
