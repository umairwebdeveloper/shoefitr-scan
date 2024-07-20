"use client";

import { useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";

export default function CameraLoader() {
	const videoRef = useRef(null);

	useEffect(() => {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					videoRef.current.srcObject = stream;
				})
				.catch((error) => {
					console.log("Something went wrong!", error);
				});
		}
	}, []);

	return (
		<main>
			<div className="shoefitr-camera-box p-3 text-center position-relative">
				<h3>Step 1 out of 2: Feet Scanning</h3>
				<p className="m-0 p-0">Place your feet to match the mask</p>
				<span
					className="position-absolute text-light"
					style={{ top: "40%", left: "8%" }}
				>
					<FaChevronLeft />
				</span>
			</div>
			<video ref={videoRef} id="videoElement" autoPlay></video>
			<div className="centered-icon">
				<FaSpinner className="spin-icon text-light" />
			</div>
		</main>
	);
}
