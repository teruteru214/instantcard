import { ArrowRight } from "lucide-react";

import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";

const SearchPage = () => {
	return (
		<div className="h-screen">
			<div className="mt-10">
				<Command className="rounded-lg border shadow-md md:min-w-[450px]">
					<CommandInput placeholder="英単語を入力してください" />
					<CommandList>
						<CommandGroup heading="サジェストワード">
							<CommandItem>
								<ArrowRight />
								<span>anything else</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything goes</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything new</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything wrong</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything interesting</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything special</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything specific</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything unusual</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything important</span>
							</CommandItem>
							<CommandItem>
								<ArrowRight />
								<span>anything available</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</div>
		</div>
	);
};

export default SearchPage;
