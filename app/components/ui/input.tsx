import { Filter } from "lucide-react"; // Filterアイコンをインポート
import * as React from "react";
import { cn } from "~/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
	icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div className="relative flex items-center">
				<Filter className="absolute left-3 h-4 w-4 text-muted-foreground" />{" "}
				<input
					type={type}
					className={cn(
						"h-10 w-full pl-10 rounded-md border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
