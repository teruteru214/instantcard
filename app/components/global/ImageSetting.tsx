import { Image } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

interface UnsplashImage {
	id: string;
	urls: {
		small: string;
		full: string;
		regular: string;
		thumb: string;
	};
	user: {
		name: string;
		links: {
			html: string;
		};
	};
	links: {
		html: string;
	};
	alt_description: string | null;
}

interface UnsplashResponse {
	total: number;
	total_pages: number;
	results: UnsplashImage[];
}

const ImageSetting = () => {
	const [searchWord, setSearchWord] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [images, setImages] = useState<UnsplashImage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const fetchImages = async (query: string, page: number) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`/api/unsplash?query=${encodeURIComponent(query)}&page=${page}`,
			);

			if (!response.ok) {
				throw new Error("画像の取得に失敗しました。");
			}

			const data: UnsplashResponse = await response.json();

			if (page === 1) {
				setImages(data.results);
			} else {
				setImages((prevImages) => [...prevImages, ...data.results]);
			}
		} catch (error) {
			alert(
				error instanceof Error
					? error.message
					: "不明なエラーが発生しました。もう一度お試しください。",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = () => {
		if (searchWord.trim() === "") return;
		setCurrentPage(1);
		fetchImages(searchWord, 1);
	};

	const loadMore = () => {
		const nextPage = currentPage + 1;
		setCurrentPage(nextPage);
		fetchImages(searchWord, nextPage);
	};

	const skeletons = Array.from({ length: 12 }, (_, index) => ({
		id: `skeleton-${index}`,
	}));

	const focusInput = () => {
		inputRef.current?.focus();
	};

	return (
		<div>
			<div className="flex flex-col items-center">
				<div
					aria-label="画像設定"
					className="w-48 h-48 sm:h-96 sm:w-96 flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-100"
					onClick={focusInput}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							focusInput();
						}
					}}
				>
					<div className="text-gray-400 flex flex-col items-center justify-center">
						<Image size={72} />
						<span className="text-sm text-center">No image</span>
					</div>
				</div>
			</div>
			<Input
				type="text"
				placeholder="Search images..."
				value={searchWord}
				onChange={(e) => setSearchWord(e.target.value)}
				handleSearch={handleSearch}
				search
				className="mx-1 my-3"
				ref={inputRef}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-items-center">
				{isLoading && images.length === 0
					? skeletons.map((skeleton) => (
							<Skeleton key={skeleton.id} className="w-full max-w-xs h-48" />
						))
					: images.map((image) => (
							<div
								key={image.id}
								className="relative w-full max-w-xs rounded-md overflow-hidden cursor-pointer group"
							>
								<img
									src={image.urls.small}
									alt={image.alt_description || "Image"}
									className="w-full h-full object-cover"
								/>
								<div className="absolute bottom-0 w-full bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center p-2 transition-opacity duration-300">
									<a
										href={image.links.html}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white text-sm underline"
									>
										{image.user.name}
									</a>
								</div>
							</div>
						))}
			</div>
			{images.length > 0 && (
				<div className="flex justify-center">
					<Button variant="ghost" className="mt-3" onClick={loadMore}>
						<Image size={20} className="mr-1" />
						別の写真を見る
					</Button>
				</div>
			)}
		</div>
	);
};

export default ImageSetting;
