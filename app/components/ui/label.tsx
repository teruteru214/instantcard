import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import { Asterisk } from "lucide-react"; // 必須項目用のアイコン
import * as React from "react";
import { cn } from "~/lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants> & {
			indispensable?: boolean;
		}
>(({ className, indispensable, children, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className, "flex items-center")}
		aria-required={indispensable}
		{...props}
	>
		<span className="text-xl font-semibold text-gray-900">{children}</span>
		{indispensable && (
			<Asterisk
				className="text-red-500 inline-block align-middle"
				aria-hidden="true"
			/>
		)}
	</LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
