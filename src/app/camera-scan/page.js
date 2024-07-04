"use client";

import { useState, useRef, useEffect } from "react";
import { FaCamera, FaStop, FaSpinner } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function CameraScan() {
	const [stream, setStream] = useState(null);
	const [recorder, setRecorder] = useState(null);
	const [recording, setRecording] = useState(false);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const videoRef = useRef();
	const router = useRouter();

	const isMobileDevice = () => {
		return /Mobi|Android/i.test(navigator.userAgent);
	};

	useEffect(() => {
		const enableCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: isMobileDevice()
							? { exact: "environment" }
							: "user",
					},
				});
				setStream(mediaStream);
				videoRef.current.srcObject = mediaStream;
			} catch (error) {
				console.error("Error accessing webcam:", error);
			}
		};

		enableCamera();

		return () => {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	const startRecording = () => {
		if (!stream) return;

		const mediaRecorder = new MediaRecorder(stream);
		setRecorder(mediaRecorder);

		let chunks = [];
		mediaRecorder.ondataavailable = (event) => {
			chunks.push(event.data);
		};

		mediaRecorder.onstop = () => {
			const recordedBlob = new Blob(chunks, { type: "video/webm" });

			const formData = new FormData();
			formData.append(
				"video",
				recordedBlob,
				`recording-${Date.now()}.webm`
			);

			fetch("https://testscan.shoefitr.io/api/upload-video/", {
				method: "POST",
				body: formData,
			})
				.then((response) => {
					if (response.ok) {
						console.log("Video uploaded successfully.");
					} else {
						console.error("Failed to upload video.");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});

			chunks = [];
		};

		mediaRecorder.start();
		setRecording(true);
		setProgress(0);

		const progressInterval = setInterval(() => {
			setProgress((prev) => prev + 1);
		}, 1000);

		// Stop recording after 5 seconds
		setTimeout(() => {
			mediaRecorder.stop();
			setRecording(false);
			clearInterval(progressInterval);
			setLoading(true);
			setTimeout(() => {
				router.push("/result");
			}, 2000); // Adjust the delay as needed
		}, 5000);
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
			<video
				ref={videoRef}
				id="videoElement"
				autoPlay
				playsInline
			></video>

			{loading ? (
				<>
					<div class="centered-icon">
						<FaSpinner class="spin-icon text-light" />
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
					<div>
						{!recording ? (
							<div
								className="shoefitr-camera-button shadow-sm"
								onClick={startRecording}
							>
								<FaCamera />
							</div>
						) : (
							<div className="shoefitr-camera-button shadow-sm text-danger">
								<FaStop />
							</div>
						)}
					</div>
					{recording && (
						<div className="progress-bar-container bg-light shadow-sm">
							<div
								className="progress-bar bg-danger"
								style={{ width: `${progress * 20}%` }}
							></div>
						</div>
					)}
				</>
			)}
		</main>
	);
}
