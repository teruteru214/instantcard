import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

interface WordAccordionProps {
	title: string;
	content: React.ReactNode;
}

const WordAccordion = ({ title, content }: WordAccordionProps) => {
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
			defaultValue={title}
		>
			<AccordionItem value={title}>
				<AccordionTrigger>{title}</AccordionTrigger>
				<AccordionContent>{content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
export default WordAccordion;
