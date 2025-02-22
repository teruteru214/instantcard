import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
				important:
					"border-transparent bg-orange-400 text-white hover:bg-orange-400",
				info: "border-transparent bg-yellow-400 text-white hover:bg-yellow-600",
				excellent:
					"border-transparent bg-green-500 text-white hover:bg-green-600",
				good: "border-transparent bg-sky-500 text-white hover:bg-sky-700",
				average:
					"border-transparent bg-yellow-500 text-black hover:bg-yellow-600",
			},
			size: {
				default: "px-3 py-1 text-lg",
				sm: "px-2 py-0.5 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
	return (
		<div
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
