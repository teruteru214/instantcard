import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

const ProfileImageSection = ({ img }: { img: string }) => {
	const [selectedImage, setSelectedImage] = useState(img);
	const [objectUrl, setObjectUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			const file = event.target.files[0];
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
			}

			const imageUrl = URL.createObjectURL(file);
			setObjectUrl(imageUrl);

			setSelectedImage(imageUrl);
		}
	};

	useEffect(() => {
		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl);
			}
		};
	}, [objectUrl]);

	const triggerFileSelect = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="flex items-center gap-4">
				<button
					type="button"
					className="relative w-20 h-20 cursor-pointer border-0 p-0 bg-transparent"
					onClick={triggerFileSelect}
					onKeyDown={(e) =>
						e.key === "Enter" || e.key === " " ? triggerFileSelect() : null
					}
					aria-label="プロフィール画像を選択"
				>
					<img
						src={selectedImage}
						alt="ユーザープロフィール画像 - クリックして変更"
						className="rounded-full object-cover w-20 h-20"
					/>
				</button>
				<Button
					variant="outline"
					className="hidden sm:block"
					onClick={triggerFileSelect}
				>
					プロフィール画像を変更
				</Button>
				<Button
					variant="outline"
					className="block sm:hidden"
					onClick={triggerFileSelect}
					aria-label="プロフィール画像を変更"
				>
					画像を変更
				</Button>
				<input
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleImageChange}
					ref={fileInputRef}
				/>
			</div>
		</div>
	);
};

export default ProfileImageSection;
