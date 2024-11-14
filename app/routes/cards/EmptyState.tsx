const EmptyState = () => (
	<div className="sm:h-[78vh] h-[73vh] w-full sm:w-1/2 border rounded-md flex flex-col items-center justify-center">
		<img src="card.webp" alt="カードがありません" className="h-40 w-40" />
		<p className="text-sm text-gray-400 text-center">
			カードを作成するとここに表示されます
		</p>
	</div>
);

export default EmptyState;
