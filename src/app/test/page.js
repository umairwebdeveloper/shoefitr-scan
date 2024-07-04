// components/WebcamCapture.js
"use client";

import React, { useRef, useEffect, useState } from "react";

const WebcamCapture = () => {
	const videoRef = useRef(null);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [isRecording, setIsRecording] = useState(false);
	const [photoInterval, setPhotoInterval] = useState(null);

	useEffect(() => {
		const startWebcam = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				videoRef.current.srcObject = stream;
				const recorder = new MediaRecorder(stream);
				setMediaRecorder(recorder);
				console.log("Webcam started and media recorder set");
			} catch (err) {
				console.error("Error accessing webcam: ", err);
			}
		};
		startWebcam();
	}, []);

	const startRecording = () => {
		if (mediaRecorder && !isRecording) {
			const interval = setInterval(() => {
				capturePhoto();
			}, 1000); // Capture photo every second
			setPhotoInterval(interval);
			mediaRecorder.start();
			setIsRecording(true);
			console.log("Recording started");
		}
	};

	const stopRecording = () => {
		if (mediaRecorder && isRecording) {
			clearInterval(photoInterval);
			mediaRecorder.stop();
			setIsRecording(false);
			console.log("Recording stopped");
		}
	};

	const capturePhoto = async () => {
		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;
		canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

		const photoData = canvas.toDataURL("image/jpeg"); // Convert canvas to base64 JPEG
		const blobData = await fetch(photoData).then((res) => res.blob());

		const formData = new FormData();
		formData.append("photo", blobData, `photo_${Date.now()}.jpeg`);

		try {
			const response = await fetch(
				"http://localhost:5000/api/uploadPhoto",
				{
					method: "POST",
					body: formData,
				}
			);
			if (!response.ok) {
				throw new Error("Failed to upload photo");
			}
			console.log("Photo uploaded successfully");
		} catch (err) {
			console.error("Error uploading photo: ", err);
		}
	};

	return (
		<div>
			<video ref={videoRef} autoPlay />
			<button onClick={startRecording} disabled={isRecording}>
				Start Recording
			</button>
			<button onClick={stopRecording} disabled={!isRecording}>
				Stop Recording
			</button>
		</div>
	);
};

export default WebcamCapture;
