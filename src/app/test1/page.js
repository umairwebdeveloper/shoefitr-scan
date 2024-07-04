"use client";
// components/Recorder.js
// components/Recorder.js

import { useState, useRef, useEffect } from "react";

const Recorder = () => {
	const [stream, setStream] = useState(null);
	const [recorder, setRecorder] = useState(null);
	const [recording, setRecording] = useState(false);
	const videoRef = useRef();

	useEffect(() => {
		const enableCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: true,
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

		// Update recording time every second
	

		return () => clearInterval(timer); // Cleanup interval on component unmount
	};

	const stopRecording = () => {
		if (recorder) {
			recorder.stop();
			setRecording(false);
		}
	};

	return (
		<div>
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				style={{ width: "100%" }}
			/>
			<div>
				{!recording ? (
					<button onClick={startRecording}>Start Recording</button>
				) : (
					<div>
						<button onClick={stopRecording}>Stop Recording</button>
						<p className="text-danger">Recording</p>
					</div>
				)}
			</div>
		</div>
	);
};

// Helper function to format time in MM:SS format


export default Recorder;
