import Markdown from '@/components/Markdown';
import PageLayout from '@/components/PageLayout';
import { getBySlug, getSlugs } from '@/util/content';
import Heading from '@/components/Heading';
import formatDate from '@/util/formatDate';

export async function generateStaticParams() {
	return getSlugs('blog').map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: SlugParam) {
	const { slug } = await params;
	const { frontmatter, content } = getBySlug('blog', slug);

	return (
		<PageLayout bg="black">
			<div className="flex min-h-screen flex-col items-center -mt-28">
				<div className="bg-red-500 w-full pt-32 pb-12 px-8 flex flex-col items-center">
					<Heading tag="h1" className="block w-full text-black/95 max-w-5xl">{frontmatter.title}</Heading>
					<div className="flex flex-col gap-4 my-12 w-full max-w-5xl">
						<p>First published: {formatDate(frontmatter.date.toISOString(), true)}</p>
						{frontmatter.tags ? (
							<div className="flex gap-2">
								{frontmatter.tags.map((tag: string) => (
									<span key={tag} className={`uppercase text-xs border-1 px-3 py-1 rounded-full`}>{tag}</span>
								))}
							</div>
						) : null}
					</div>
				</div>
				<div className="w-full max-w-5xl py-12 px-8">
					<article className="prose dark:prose-invert mt-12 max-w-2xl ml-auto">
						<Markdown source={content} />
					</article>
				</div>
			</div>
		</PageLayout>
	);
}
