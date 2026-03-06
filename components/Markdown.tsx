import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkGithubBetaBlockquoteAdmonitions from 'remark-github-beta-blockquote-admonitions';
import rehypeHighlight from 'rehype-highlight';
import KillProcessCommand from './KillProcessCommand';
import Heading from '@/components/Heading';
import { Link } from 'next-view-transitions';
import AnchorLink from '@/components/AnchorLink';
import { cn } from '@sglara/cn';
import 'highlight.js/styles/base16/chalk.min.css';

export default function Markdown({ source }: { source: string }) {
	return (
		<div>
			<MDXRemote
				source={source}
				options={{
					mdxOptions: {
						remarkPlugins: [remarkGfm, remarkGithubBetaBlockquoteAdmonitions],
						rehypePlugins: [rehypeHighlight],
					},
				}}
				components={{
					KillProcessCommand, // TODO: does this need to be lazy loaded?
					a: ({ className, ...props }) => {
						// Handle footnote links
						if ('data-footnote-ref' in props || 'data-footnote-backref' in props) {
							return <AnchorLink className={cn('text-red-500 underline', className)} {...props} />;
						}

						// Handle internal links as view transition Link elements
						if (props.href?.startsWith('/')) {
							return <Link className={cn('text-blue-500 underline', className)} {...props} />;
						}

						// Treat all other links as external links, intentionally ignoring target and rel props
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const { target, rel, ...rest } = props;
						return <a target="_blank" rel="noopener noreferrer" className={cn('text-blue-500 underline', className)} {...rest} />;
					},
					div: (props) => {
						if (props.className?.includes('admonition')) {
							const { className, ...rest } = props;
							return (
								<div
									className={cn(
										'border-2 border-blue-500 rounded-md px-4',
										'[&>p.admonition-title]:text-xs [&>p.admonition-title]:uppercase [&>p.admonition-title]:-mx-4 [&>p.admonition-title]:my-0 [&>p.admonition-title]:bg-blue-500 [&>p.admonition-title]:text-white [&>p.admonition-title]:px-4 [&>p.admonition-title]:py-2',
										className
									)}
									{...rest}
								/>
							);
						}

						return <div {...props} />;
					},
					h1: (props) => <Heading tag="h1" {...props} />,
					h2: (props) => <Heading tag="h2" size={props?.id === 'footnote-label' ? 'h5' : 'h2'} {...props} />,
					h3: (props) => <Heading tag="h3" {...props} />,
					h4: (props) => <Heading tag="h4" {...props} />,
					h5: (props) => <Heading tag="h5" {...props} />,
					h6: (props) => <Heading tag="h6" {...props} />,
					pre: ({ className, ...props }) => <pre className={cn('font-mono has-[code]:px-0', className)} {...props} />,
					code: ({ className, ...props }) => <code className={cn('font-mono rounded-md', className)} {...props} />,
				}}
			/>
		</div>
	);
}
