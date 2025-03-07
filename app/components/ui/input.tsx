import * as React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./badge";

interface InputProps extends React.ComponentProps<"input"> {
	icon?: React.ReactNode;
	search?: boolean;
	handleSearch?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, search, handleSearch, ...props }, ref) => {
		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter" && handleSearch) {
				handleSearch();
			}
		};

		return (
			<div className="relative flex items-center">
				{icon && <div className="absolute left-3">{icon}</div>}
				<input
					type={type}
					className={cn(
						"h-10 w-full rounded-md border border-gray-300 bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
						icon ? "pl-10" : "pl-3",
						className,
					)}
					ref={ref}
					onKeyDown={handleKeyDown}
					{...props}
				/>
				{search && props.value && handleSearch && (
					<Badge
						className="absolute right-3 top-1/2 -translate-y-1/2 animate-fade cursor-pointer"
						onClick={handleSearch}
						size="sm"
					>
						<span className="sm:hidden">click</span>
						<span className="hidden sm:inline">Enter or click</span>
					</Badge>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
