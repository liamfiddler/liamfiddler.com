import { getList, compareDateDesc } from '@/util/content';
import PageTransitionLink from '@/components/PageTransitionLink';
import PageLayout from '@/components/PageLayout';
import Heading from '@/components/Heading';

export default function BlogPage() {
	const posts = getList('blog').sort(compareDateDesc);

	return (
		<PageLayout bg="green">
			<div className="min-h-screen flex flex-col items-center text-black/85 px-8">
				<Heading tag="h1" size="mega" className="block w-full uppercase -tracking-[0.5em] -mt-[6cqi]">Blog</Heading>
				<div className="w-full pt-24">
					{posts.map((post) => (
						<div
							key={post.slug}
							className="block w-full border-b-2 last:border-b-0"
						>
							<PageTransitionLink href={`/blog/${post.slug}/`} className="group relative flex flex-col md:flex-row gap-4 justify-between items-center px-2 py-12 w-full transition-all duration-300 hover:text-white/80 focus:text-white/80 hover:translate-x-4 focus:translate-x-4 hover:before:content-[''] hover:before:absolute hover:before:top-0 hover:before:right-full hover:before:w-4 hover:before:h-full">
								<div className="w-full">
									<h2 className="text-4xl font-black">
										{post.frontmatter.title}
									</h2>
									<p className="text-xl mt-2 max-w-2xl">{post.frontmatter.description}</p>
									{post.frontmatter.tags ? (
										<div className="flex gap-2 mt-4">
											{post.frontmatter.tags.map((tag: string) => (
												<span key={tag} className={`uppercase text-xs border-1 px-3 py-1 rounded-full`}>{tag}</span>
											))}
										</div>
									) : null}
								</div>
								<div className="w-24 text-2xl font-black font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">&rarr;</div>
							</PageTransitionLink>
						</div>
					))}
				</div>
			</div>
		</PageLayout>
	);
}
