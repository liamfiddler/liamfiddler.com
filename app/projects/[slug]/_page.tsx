import PageTransitionLink from '@/components/PageTransitionLink';
import Markdown from '@/components/Markdown';
import PageLayout from '@/components/PageLayout';
import { getBySlug, getSlugs } from '@/util/content';

// TODO: Write the content so these pages can be enabled again

export async function generateStaticParams() {
	return [];
	// return getSlugs('projects').map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: SlugParam) {
	const { slug } = await params;
	const { frontmatter, content } = getBySlug('projects', slug);

	return (
		<PageLayout bg="red">
			<div className="flex min-h-screen flex-col items-center p-24">
				<div className="w-full max-w-2xl">
					<PageTransitionLink
						href="/projects"
						className="text-blue-600 hover:underline"
					>
						← Back to Projects
					</PageTransitionLink>
					<h1 className="mt-8 text-4xl font-bold">{frontmatter.title}</h1>
					<p className="mt-2 text-zinc-500">
						{frontmatter.year} - {frontmatter.role}
					</p>
					<article className="prose dark:prose-invert mt-12 max-w-none">
						<Markdown source={content} />
					</article>
				</div>
			</div>
		</PageLayout>
	);
}
