'use client';

import { useLayoutEffect, useRef } from "react";

type Props = React.ComponentProps<'div'> & {
    variable: string;
};

function updateWidthVariable(div: HTMLDivElement, variable: string) {
    const { width } = div.getBoundingClientRect() || { width: 0 };
    document.documentElement.style.setProperty(variable, `${width}px`);
}

export default function MeasureWidth({ variable, ...props }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        updateWidthVariable(ref.current, variable);

        const observer = new ResizeObserver(([entry]) => {
            updateWidthVariable(entry.target as HTMLDivElement, variable);
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref, variable]);

    return <div ref={ref} {...props} />;
}
