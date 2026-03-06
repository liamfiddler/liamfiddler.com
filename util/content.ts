import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export const CONTENT_DIR = path.join(process.cwd(), 'content');

export const CONTENT_EXTENSION = '.mdx';

type ContentType = 'projects' | 'blog';

export const getSlugs = (dir: ContentType) => {
	return fs
		.readdirSync(path.join(CONTENT_DIR, dir))
		.map((file) => file.replace(CONTENT_EXTENSION, ''));
};

export const getBySlug = (dir: ContentType, slug: string) => {
	const filePath = path.join(CONTENT_DIR, dir, `${slug}${CONTENT_EXTENSION}`);
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const { data, content } = matter(fileContents);
	return { frontmatter: data, content };
};

export const getList = (dir: ContentType) => {
	const slugs = getSlugs(dir);

	return slugs.map((slug) => {
		const { frontmatter } = getBySlug(dir, slug);
		return { slug, frontmatter };
	});
};

export const compareDateDesc = (
	a: { frontmatter: { date?: Date } },
	b: { frontmatter: { date?: Date } }
) =>
	(b.frontmatter.date?.getTime() || 0) - (a.frontmatter.date?.getTime() || 0);

export const compareYearDesc = (
	a: { frontmatter: { year?: number } },
	b: { frontmatter: { year?: number } }
) => (b.frontmatter.year || 0) - (a.frontmatter.year || 0);
