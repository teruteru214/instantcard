import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"border border-input bg-gray-50 hover:bg-gray-100 hover:text-accent-foreground",
				black: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				highlight:
					"bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900",
				white: "border bg-white text-black hover:bg-gray-100",
				outline:
					"border border-input bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-full px-3",
				lg: "h-11 rounded-full px-8",
				xl: "h-12 rounded-full px-10",
				giant: "h-12 rounded-full px-20",
				icon: "h-10 w-10",
				option: "h-auto px-6 py-3 text-center",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
