import { useCallback, useRef } from "react";

export const useDebounce = (timeout: number) => {
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debouncedFetch = useCallback(
		(callback: () => void) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			timer.current = setTimeout(() => {
				callback();
			}, timeout);
		},
		[timeout],
	);

	return debouncedFetch;
};
