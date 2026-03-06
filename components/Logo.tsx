import { cn } from '@sglara/cn';
import { Titan_One } from 'next/font/google';

const titanOne = Titan_One({
    weight: '400',
    subsets: ['latin'],
});

type LogoProps = Omit<React.ComponentProps<'div'>, 'children'>;

export default function Logo({
    className = '',
    ...props
}: LogoProps) {
    return (
        <div className={cn(titanOne.className, '@container block perspective-[120px] -rotate-x-40 w-24 flex flex-col items-start justify-center uppercase', className)} {...props}>
            <div className="-rotate-y-40 -ml-3 scale-x-125">
                <div className="text-[40cqi] leading-[0.75] -mt-1">Liam</div>
                <div className="text-[23.4cqi] leading-[0.75] mt-1">Fiddler</div>
            </div>
        </div>
    );
}
