import { FaCamera } from "react-icons/fa6";

export default function CameraPermission() {
	return (
		<main>
			<div class="p-4 full-container">
				<div class="permission-box pt-3 text-center">
					<p class="mx-3">
						Please accept the access of Shoefitr.io to your camera
					</p>
					<div class="permission-button w-100 p-3">
						Access the access
					</div>
					<div class="permission-button w-100 p-3">Cancel</div>
				</div>
			</div>

			<div>
				<div class="shoefitr-camera-button shadow-sm">
					<FaCamera />
				</div>
			</div>
		</main>
	);
}
