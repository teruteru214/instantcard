import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";

interface WordAccordionProps {
	id?: string;
	title: string;
	content: React.ReactNode;
}

const WordAccordion = ({ id, title, content }: WordAccordionProps) => {
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full"
			defaultValue={title}
		>
			<AccordionItem value={title} id={id}>
				<AccordionTrigger>{title}</AccordionTrigger>
				<AccordionContent>{content}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
export default WordAccordion;
