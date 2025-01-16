import { useDroppable } from "@dnd-kit/core";

const DropZone = () => {
	const { setNodeRef, isOver } = useDroppable({ id: "dropzone" });

	return (
		<div
			ref={setNodeRef}
			aria-label="カードを削除するドロップゾーン"
			className={`hidden sm:flex flex-col items-center justify-center w-1/3 p-4 border border-dashed rounded-md cursor-pointer ${
				isOver ? "bg-gray-100" : ""
			}`}
		>
			<div className="flex flex-col items-center justify-center">
				<img src="/trash-can.webp" alt="trash" className="h-40 w-40" />
				<span className="text-sm text-gray-400 text-center">
					Dropzone(カードを削除できます)
				</span>
			</div>
		</div>
	);
};

export default DropZone;
