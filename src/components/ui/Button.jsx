import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : 'button';

    const variants = {
        primary: 'bg-lapis text-white hover:bg-lapis/80 shadow-[0_0_15px_rgba(13,79,139,0.5)] border border-lapis/50',
        secondary: 'bg-palladium text-obsidian hover:bg-white',
        accent: 'bg-weird-orange text-white hover:bg-weird-orange/80 shadow-[0_0_15px_rgba(228,87,27,0.5)]',
        glass: 'glossy-btn text-white',
        ghost: 'hover:bg-white/10 text-white',
        outline: 'border border-white/20 text-white hover:bg-white/10',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-obsidian',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button };
