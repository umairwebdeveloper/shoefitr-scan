import { FaCamera } from "react-icons/fa6";

export default function CameraPermission() {
	return (
		<main>
			<div className="p-4 full-container">
				<div className="permission-box pt-3 text-center">
					<p className="mx-3">
						Please accept the access of Shoefitr.io to your camera
					</p>
					<div className="permission-button w-100 p-3">
						Access the access
					</div>
					<div className="permission-button w-100 p-3">Cancel</div>
				</div>
			</div>

			<div>
				<div className="shoefitr-camera-button shadow-sm">
					<FaCamera />
				</div>
			</div>
		</main>
	);
}
