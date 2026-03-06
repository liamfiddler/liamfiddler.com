import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
	{
		rules: {
			'no-restricted-imports': [
				'warn',
				{
					paths: [
						{
							name: 'next/link',
							message:
								'Use `import { Link } from "next-view-transitions"` to support View Transitions.',
						},
						{
							name: 'next/navigation',
							importNames: ['useRouter'],
							message:
								'Use `import { useTransitionRouter } from "next-view-transitions"` to support View Transitions.',
						},
						{
							name: 'next/router',
							importNames: ['useRouter'],
							message:
								'Use `import { useTransitionRouter } from "next-view-transitions"` to support View Transitions.',
						},
					],
				},
			],
		},
	},
]);

export default eslintConfig;
