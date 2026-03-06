import MarqueeLink from '@/components/MarqueeLink';
import { getList, compareYearDesc } from '@/util/content';
import PageLayout from '@/components/PageLayout';

export default function ProjectsPage() {
	const projects = getList('projects').sort(compareYearDesc);

	return (
		<PageLayout bg="orange">
			<div className="flex-grow flex flex-col items-center justify-center">
				{projects.map((project, index) => (
					<MarqueeLink
						key={project.slug}
						href={/*`/projects/${project.slug}`*/ project.frontmatter.url}
						direction={index % 2 === 0 ? 'left' : 'right'}
						title={project.frontmatter.title}
						target="_blank"
						rel="noopener noreferrer"
					>
						{/* <h2 className="text-2xl font-semibold">
								{project.frontmatter.title}
							</h2>
							<p className="text-zinc-500">
								{project.frontmatter.year} - {project.frontmatter.role}
							</p>
							<p className="mt-2">{project.frontmatter.description}</p> */}
					</MarqueeLink>
				))}
			</div>
		</PageLayout>
	);
}
