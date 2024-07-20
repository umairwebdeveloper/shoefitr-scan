"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaSpinner, FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function CameraScan() {
	const router = useRouter();
	const webcamRef = useRef(null);
	const [loading, setLoading] = useState(false);

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();

		if (imageSrc) {
			setLoading(true);

			// Convert base64 image to blob
			fetch(imageSrc)
				.then((res) => res.blob())
				.then((blob) => {
					const formData = new FormData();
					formData.append("image", blob, "capture.jpg");

					axios
						.post("http://127.0.0.1:8000/api/", formData, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
						.then(() => {
							toast.success("Image uploaded successfully!");
							setLoading(false);
							// router.push("/insole/proceed");
						})
						.catch((error) => {
							console.error("Error uploading image", error);
							toast.error("Failed to upload image.");
							setLoading(false);
						});
				});
		} else {
			toast.error("Failed to capture image.");
		}
	};

	return (
		<main>
			<div className="shoefitr-camera-box p-3 text-center position-relative">
				<h3>Step 1 out of 2: Feet Scanning</h3>
				<p className="m-0 p-0">Place your feet to match the mask</p>
				<span
					className="position-absolute text-light"
					style={{ top: "40%", left: "8%" }}
					onClick={() => router.back()}
				>
					<FaChevronLeft />
				</span>
			</div>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={{ facingMode: "environment" }}
				id="videoElement"
			/>
			{loading ? (
				<>
					<div className="centered-icon text-center">
						<FaSpinner className="spin-icon text-light" />
						<h3 className="text-light text-center shadow-sm mt-3">
							Processing...
						</h3>
					</div>
				</>
			) : (
				<>
					<div className="centered-icon">
						<img
							src="/assets/png/mask.png"
							className="img-fluid"
							width="200"
							alt="mask"
						/>
					</div>
					<div className="text-center mt-3">
						<div
							className="shoefitr-camera-button shadow-sm"
							onClick={captureImage}
						>
							<FaCamera />
						</div>
					</div>
				</>
			)}
		</main>
	);
}
