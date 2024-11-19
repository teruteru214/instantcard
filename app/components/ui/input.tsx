import * as React from "react";
import { cn } from "~/lib/utils";
import { Badge } from "./badge";

interface InputProps extends React.ComponentProps<"input"> {
	icon?: React.ReactNode;
	search?: boolean;
	handleSearch?: () => void; // 検索トリガー関数をオプションに変更
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, search, handleSearch, ...props }, ref) => {
		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter" && handleSearch) {
				handleSearch(); // Enterキーが押されたときに検索を実行
			}
		};

		return (
			<div className="relative flex items-center">
				{icon && <div className="absolute left-3">{icon}</div>}
				<input
					type={type}
					className={cn(
						"h-10 w-full rounded-md border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						icon ? "pl-10" : "pl-3",
						className,
					)}
					ref={ref}
					onKeyDown={handleKeyDown} // Enterキーの検知
					{...props} // props内のvalueとonChangeを使用
				/>
				{search && props.value && handleSearch && (
					<Badge
						className="absolute right-3 top-5 animate-fade cursor-pointer"
						onClick={handleSearch} // Badgeのクリックで検索をトリガー
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
