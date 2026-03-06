import { cn } from '@sglara/cn';
// Use next/link to avoid the page transition running when you click a footnote link.
// This is probably the only place in this codebase we actually want to import from next/link!
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link';

export default function AnchorLink({ className, ...props }: React.ComponentProps<typeof NextLink>) {
    return (
        <NextLink className={cn('text-red-500 underline', className)} {...props} />
    );
}
