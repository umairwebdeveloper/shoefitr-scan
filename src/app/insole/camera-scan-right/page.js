"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaSpinner, FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useQueryString from "../../../hooks/useQueryString";
import axios from "axios";
import toast from "react-hot-toast";

export default function CameraScan() {
	const router = useRouter();
	const webcamRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const queryString = useQueryString();

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();

		if (imageSrc) {
			setLoading(true);

			// Convert base64 image to blob
			fetch(imageSrc)
				.then((res) => res.blob())
				.then((blob) => {
					const formData = new FormData();
					formData.append("file", blob, "capture.jpg");

					axios
						.post(
							"https://api.shoefitr.io/api/calculate_cloud_point/",
							formData,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
						.then((response) => {
							toast.success(response.data.message);
							setLoading(false);
							router.push(
								`/insole/camera-scan-left?${queryString}`
							);
						})
						.catch((error) => {
							const errorMessage =
								error.response?.data?.error ||
								"An error occurred";
							toast.error(errorMessage);
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
				<h3>step 3 out of 6: Right bottom scanning</h3>
				<p className="m-0 p-0">
					Please scan bottom part of your right foot
				</p>
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
							src="/assets/png/right-foot.png"
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
