import {cn} from '@/lib/utils';

export function Text({className, ...props}: React.ComponentProps<'p'>) {
	return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />;
}
export function Lead({className, ...props}: React.ComponentProps<'p'>) {
	return <p className={cn('text-xl text-muted-foreground', className)} {...props} />;
}
