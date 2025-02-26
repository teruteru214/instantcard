import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground",
				outline: "text-foreground",
				plain: "text-foreground hover:bg-gray-100", // outline と同じデザインで hover で色が変わる
				important: "border-transparent bg-orange-400 text-white",
				info: "border-transparent bg-yellow-400 text-white",
				excellent: "border-transparent bg-green-500 text-white",
				good: "border-transparent bg-sky-500 text-white",
				average: "border-transparent bg-yellow-500 text-black",
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
