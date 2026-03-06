import { cn } from '@sglara/cn';
import slugify from '@sindresorhus/slugify';
import reactChildrenToText from '@/util/reactChildrenToText';

const HEADING_SIZES = {
    h1: 'text-[15cqi] leading-[0.85]',
    h2: 'text-[6cqi] leading-[0.85]',
    h3: 'text-[5cqi] leading-[0.85]',
    h4: 'text-[4cqi] leading-[0.85]',
    h5: 'text-[3cqi] leading-[0.85]',
    h6: 'text-[2cqi] leading-[0.85]',
    mega: 'text-[25cqi] leading-[0.75]',
    hero: 'text-[14.3cqi] leading-[0.8]',
} as const;

type HeadingProps = {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    size?: keyof typeof HEADING_SIZES;
} & React.ComponentProps<'h1'>;

export default function Heading({
    children,
    tag: Tag = 'h1',
    size,
    className = '',
    ...props
}: HeadingProps) {
    const id = props.id ?? slugify(reactChildrenToText(children));

    return (
        <Tag className={cn('@container font-titan-one block py-4', className)} id={id} {...props}>
            <div className={cn(HEADING_SIZES[size || Tag], 'w-full text-balance')}>
                {children}
            </div>
        </Tag>
    );
}
