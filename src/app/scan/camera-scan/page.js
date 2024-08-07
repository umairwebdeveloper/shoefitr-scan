"use client";

import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { FaCamera, FaSpinner, FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useQueryString from "../../../hooks/useQueryString";
import axios from "axios";
import toast from "react-hot-toast";

export default function CameraScan() {
	const router = useRouter();
	const webcamRef = useRef(null);
	const [shoeSizeData, setShoeSizeData] = useState(null);
	const [loading, setLoading] = useState(false);
	const queryString = useQueryString();

	useEffect(() => {
		const data = localStorage.getItem("shoeSizeData");
		if (data) {
			setShoeSizeData(JSON.parse(data));
		}
	}, []);

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();

		if (imageSrc) {
			setLoading(true);

			// Convert base64 image to blob
			fetch(imageSrc)
				.then((res) => res.blob())
				.then((blob) => {
					const formData = new FormData();
					formData.append("shopid", shoeSizeData.shopid);
					formData.append("userid", shoeSizeData.userid);
					formData.append("model_name", shoeSizeData.modelname);
					formData.append("size", shoeSizeData.selectedSize);
					formData.append("selection", shoeSizeData.selectedAgeGroup);
					formData.append("system", shoeSizeData.selectedSystem);
					formData.append("picture", blob, "capture.jpg");

					axios
						.post(
							"https://testscan.shoefitr.io/api/calculation/",
							formData,
							{
								headers: {
									"Content-Type": "multipart/form-data",
								},
							}
						)
						.then((response) => {
							if (response.data.found) {
								toast.success(response.data.message);
								setLoading(false);
								localStorage.setItem(
									"responseData",
									JSON.stringify(response.data)
								);
								router.push(`/scan/result?${queryString}`);
							} else {
								toast.error("No data found. Please try again.");
								setLoading(false);
							}
						})
						.catch((error) => {
							const errorMessage =
								error.response?.data?.message ||
								"An error occurred";
							console.error("Error uploading image", error);
							toast.error(errorMessage);
							setLoading(false);
						});
				});
		} else {
			toast.error("Failed to capture image.");
		}
	};

	if (!shoeSizeData) {
		return (
			<div className="container mt-3">
				<div className="alert alert-danger" role="alert">
					Shoe size data not found. Please select size again.
				</div>
			</div>
		);
	}

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
