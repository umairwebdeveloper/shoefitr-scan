"use client";

import { useEffect, useRef } from "react";
import { FaCamera } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function CameraScan() {
	const router = useRouter();
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
					onClick={() => router.back()}
				>
                    <FaChevronLeft />
                </span>
			</div>
			<video ref={videoRef} id="videoElement" autoPlay></video>
			<div className="centered-icon">
				<img
					src="/assets/png/mask.png"
					className="img-fluid"
					width="200"
					alt="mask"
				/>
			</div>
			<div>
				<div className="shoefitr-camera-button shadow-sm" onClick={() => router.push("/proceed")}>
					<FaCamera />
				</div>
			</div>
		</main>
	);
}
