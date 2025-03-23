import { useCallback, useEffect } from "react";

interface UseKeyboardControlsProps {
	togglePlay: () => void;
	setIsSizing: (value: boolean) => void;
}

export const useKeyboardControls = ({
	togglePlay,
	setIsSizing,
}: UseKeyboardControlsProps): void => {
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case "f":
					setIsSizing(true);
					event.preventDefault();
					break;
				case "-":
					setIsSizing(false);
					event.preventDefault();
					break;
				case " ":
				case "k":
					togglePlay();
					event.preventDefault();
					break;
				default:
					break;
			}
		},
		[setIsSizing, togglePlay],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
};
