import Heading from '@/components/Heading';
import MeasureWidth from '@/components/MeasureWidth';
import PageLayout from '@/components/PageLayout';
import Marquee from 'react-fast-marquee';

export default function Home() {
	return (
		<PageLayout bg="blue">
			<div className="w-full px-10 pt-10">
				<Heading size="hero" className="uppercase text-black/85">
					<div className="flex flex-col scale-y-125 origin-bottom">
						Digital <span className="text-white/85">experiences</span> <MeasureWidth variable="--at-scale-width" className="ml-auto self-end">at scale</MeasureWidth>
					</div>
				</Heading>
			</div>
			<div className="mt-8 ml-10 sm:ml-auto mr-10 sm:w-[var(--at-scale-width)] sm:pl-1 flex flex-col gap-4">
				<p className="text-2xl max-w-xl">I&rsquo;m Liam, I lead Product Engineering at <a href="https://futurefriendly.studio" target="_blank" rel="noopener noreferrer" title="A design and innovation studio in Sydney">Future&nbsp;Friendly</a>.</p>
				<p className="text-2xl max-w-xl">I help organisations navigate technical risk, define technical strategy, and guide complex 0-1 products from initial concept to market&nbsp;reality.</p>
			</div>
			<section className="pt-32 pb-16 overflow-x-hidden">
				{/* <Heading tag="h2" className="block px-10">Talk to me about</Heading> */}
				<div className="text-3xl leading-loose font-titan-one bg-yellow-500 text-black/85 w-[120dvw] -rotate-2">
					<Marquee speed={50} autoFill pauseOnHover>
						<span className="mr-16">Accessibility.</span>
						<span className="mr-16">Open web standards.</span>
						<span className="mr-16">Design-led development.</span>
					</Marquee>
				</div>
			</section>
		</PageLayout>
	);
}
