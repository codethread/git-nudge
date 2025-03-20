import {cn} from '@/lib/utils';
import {type VariantProps, cva} from 'class-variance-authority';
import {Skeleton} from './skeleton';

const textVariants = cva('', {
	variants: {
		variant: {
			default: '',
		},
		flush: {
			false: '[&:not(:first-child)]:mt-6 leading-7',
			true: null,
		},
	},
	defaultVariants: {
		variant: 'default',
		flush: false,
	},
});

export function Text({
	className,
	variant,
	flush,
	...props
}: React.ComponentProps<'p'> & VariantProps<typeof textVariants>) {
	return <p className={cn(textVariants({variant, className, flush}))} {...props} />;
}

export function Lead({className, ...props}: React.ComponentProps<'p'>) {
	return <p className={cn('text-xl text-muted-foreground', className)} {...props} />;
}

export function TextSkeleton({className}: {className?: string}) {
	// TODO: there must be a var for this
	return (
		<div className="h-[calc(var(--text-base)*1.5)] flex flex-col justify-center">
			<Skeleton className={cn('h-(--text-base) w-[250px]', className)} />
		</div>
	);
}
