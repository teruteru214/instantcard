import * as React from "react";

import { cn } from "~/lib/utils";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-60 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 md:text-sm",
				className,
			)}
			ref={ref}
			maxLength={500}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
