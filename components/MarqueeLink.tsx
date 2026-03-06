import { cn } from '@sglara/cn';
import Marquee from "react-fast-marquee";
import PageTransitionLink from '@/components/PageTransitionLink';

type MarqueeLinkProps = {
    direction?: 'left' | 'right';
} & React.ComponentProps<typeof PageTransitionLink>;

export default function MarqueeLink({
    direction = 'left',
    className = '',
    title,
    ...props
}: MarqueeLinkProps) {
    return (
        <Marquee direction={direction} speed={92} autoFill pauseOnHover className="group overflow-y-hidden">
            <PageTransitionLink className={cn(
                'font-titan-one',
                'text-[15dvw] uppercase leading-[1.05] whitespace-nowrap',
                'transition-colors duration-300 ease-in-out',
                'group-hover:text-white',
                'group-focus:text-white',
                className
            )} title={title} {...props}>
                {title}&nbsp;&bull;&nbsp;
            </PageTransitionLink>
        </Marquee>
    );
}
