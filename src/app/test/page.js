"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { systemsData, sizeData } from "../../utils/sizes";
import { FaPaperPlane } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const UserTest = () => {
	const [selectedSystem, setSelectedSystem] = useState(null);
	const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
	const [selectedGender, setSelectedGender] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);

	useEffect(() => {
		const defaultSystem = systemsData.find(
			(system) => system.value === "EU"
		);
		setSelectedSystem(defaultSystem);
	}, []);

	const handleSystemChange = (selectedOption) => {
		setSelectedSystem(selectedOption);
		setSelectedAgeGroup("");
		setSelectedGender("");
		setSelectedSize("");
	};

	const handleAgeGroupChange = (e) => {
		setSelectedAgeGroup(e.target.value);
		setSelectedGender("");
		setSelectedSize("");
	};

	const handleGenderChange = (e) => {
		setSelectedGender(e.target.value);
		setSelectedSize("");
	};

	const handleSizeChange = (selectedOption) => {
		setSelectedSize(selectedOption);
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleScanTest = async () => {
		if (!selectedSystem || !selectedAgeGroup || !selectedSize || !image) {
			toast.error("Please fill all the fields and upload an image.");
			return;
		}

		const formData = new FormData();
		formData.append("test_scan", "true");
		formData.append("system", selectedSystem.value);
		formData.append("selection", selectedAgeGroup);
		formData.append("selectedGender", selectedGender);
		formData.append("size", selectedSize.value);
		if (image) {
			formData.append("picture", image);
		}

		setLoading(true);

		try {
			const response = await axios.post(
				"https://api.shoefitr.io/api/calculation/",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setResponse(response.data);
			toast.success("Request sent successfully.");
			window.scrollTo(0, document.body.scrollHeight);
		} catch (error) {
			console.error("Error:", error);
			toast.error("An error occurred while sending the request.");
			setResponseError(
				"An error occurred while sending the request. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const getAvailableSizes = () => {
		if (selectedSystem?.value === "US" && selectedAgeGroup === "adult") {
			if (selectedGender === "men") {
				return sizeData.adult.US;
			} else if (selectedGender === "women") {
				return sizeData.adult.US_W;
			}
		}
		return sizeData[selectedAgeGroup]?.[selectedSystem?.value] || [];
	};

	const availableSizes = getAvailableSizes().map((size) => ({
		value: size,
		label: size,
	}));
	const isAdultUS =
		selectedSystem?.value === "US" && selectedAgeGroup === "adult";

	const isButtonDisabled =
		!selectedSystem ||
		!selectedAgeGroup ||
		(isAdultUS && !selectedGender) ||
		!selectedSize;

	return (
		<div>
			<div className="p-3">
				<Image
					src="/assets/svg/logo.svg"
					alt="Logo"
					width={67}
					height={67}
					className="img-fluid"
				/>
			</div>

			<div className="container my-3">
				<div className="p-3 bg-light rounded mb-4">
					<h3 className="fs-2 fw-bold text-center">Test Foot Size</h3>
					<p className="text-center text-muted">
						Upload images of your feet and select relevant
						information to receive an accurate shoe size
						recommendation.
					</p>
				</div>
				<div className="">
					<div className="mb-3">
						<label className="form-label">
							Select Size System:
						</label>
						<Select
							options={systemsData}
							value={selectedSystem}
							onChange={handleSystemChange}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label d-block">
							Select Age Group:
						</label>
						<div className="d-flex justify-content-evenly align-items-center">
							<label className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									value="adult"
									checked={selectedAgeGroup === "adult"}
									onChange={handleAgeGroupChange}
									disabled={!selectedSystem}
								/>
								<span className="form-check-label">Adult</span>
							</label>
							<label className="form-check form-check-inline">
								<input
									className="form-check-input"
									type="radio"
									value="child"
									checked={selectedAgeGroup === "child"}
									onChange={handleAgeGroupChange}
									disabled={!selectedSystem}
								/>
								<span className="form-check-label">Child</span>
							</label>
						</div>
					</div>
					{isAdultUS && (
						<div className="mb-3">
							<label className="form-label d-block">
								Select Gender:
							</label>
							<div className="d-flex justify-content-evenly align-items-center">
								<label className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										value="men"
										checked={selectedGender === "men"}
										onChange={handleGenderChange}
										disabled={!selectedAgeGroup}
									/>
									<span className="form-check-label">
										Men
									</span>
								</label>
								<label className="form-check form-check-inline">
									<input
										className="form-check-input"
										type="radio"
										value="women"
										checked={selectedGender === "women"}
										onChange={handleGenderChange}
										disabled={!selectedAgeGroup}
									/>
									<span className="form-check-label">
										Women
									</span>
								</label>
							</div>
						</div>
					)}
					<div className="mb-3">
						<label className="form-label">
							Select Previous Size:
						</label>
						<Select
							options={availableSizes}
							value={selectedSize}
							onChange={handleSizeChange}
							isDisabled={
								!selectedAgeGroup ||
								(isAdultUS && !selectedGender)
							}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">
							Upload Both Feet Image:
						</label>
						<input
							type="file"
							className="form-control"
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>
					<div className="">
						<button
							className="shoefitr-primary-button d-flex justify-content-center align-items-center gap-2 w-100"
							disabled={isButtonDisabled || loading}
							onClick={handleScanTest}
						>
							{loading ? (
								<span
									className="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"
								></span>
							) : (
								<FaPaperPlane />
							)}
							{loading ? "Sending..." : "Send"}
						</button>
					</div>
					{responseError && (
						<div className="alert alert-danger my-4">
							{responseError}
						</div>
					)}
					{response && (
						<div className="my-4">
							<h4 className="fs-4 fw-bold mb-3 text-center">
								Response
							</h4>
							<img
								src={response.uri}
								alt="Image"
								className="img-fluid w-100 rounded"
							/>
							<table className="table table-bordered my-3">
								<tbody>
									<tr>
										<td>
											<strong>Ball Advice</strong>
										</td>
										<td>{response.ball_advice}</td>
									</tr>
									<tr>
										<td>
											<strong>Ball Fit</strong>
										</td>
										<td>{response.ball_fit}</td>
									</tr>
									<tr>
										<td>
											<strong>Ball Left</strong>
										</td>
										<td>{response.ball_l}</td>
									</tr>
									<tr>
										<td>
											<strong>Ball Right</strong>
										</td>
										<td>{response.ball_r}</td>
									</tr>
									<tr>
										<td>
											<strong>Correct Size</strong>
										</td>
										<td>{response.correct_size}</td>
									</tr>
									<tr>
										<td>
											<strong>Found</strong>
										</td>
										<td>{response.found}</td>
									</tr>
									<tr>
										<td>
											<strong>Instep Advice</strong>
										</td>
										<td>{response.instep_advice}</td>
									</tr>
									<tr>
										<td>
											<strong>Instep Fit</strong>
										</td>
										<td>{response.instep_fit}</td>
									</tr>
									<tr>
										<td>
											<strong>Instep Left</strong>
										</td>
										<td>{response.instep_l}</td>
									</tr>
									<tr>
										<td>
											<strong>Instep Right</strong>
										</td>
										<td>{response.instep_r}</td>
									</tr>
									<tr>
										<td>
											<strong>Length Left</strong>
										</td>
										<td>{response.length_l}</td>
									</tr>
									<tr>
										<td>
											<strong>Length Right</strong>
										</td>
										<td>{response.length_r}</td>
									</tr>
									<tr>
										<td>
											<strong>Message</strong>
										</td>
										<td>{response.message}</td>
									</tr>
									<tr>
										<td>
											<strong>Model ID</strong>
										</td>
										<td>{response.model_id}</td>
									</tr>
									<tr>
										<td>
											<strong>Size</strong>
										</td>
										<td>{response.size}</td>
									</tr>
									<tr>
										<td>
											<strong>Totally Fit</strong>
										</td>
										<td>{response.totally_fit}</td>
									</tr>
									<tr>
										<td>
											<strong>Waist Left</strong>
										</td>
										<td>{response.waist_l}</td>
									</tr>
									<tr>
										<td>
											<strong>Waist Right</strong>
										</td>
										<td>{response.waist_r}</td>
									</tr>
									<tr>
										<td>
											<strong>Width Advise</strong>
										</td>
										<td>{response.width_advice}</td>
									</tr>
									<tr>
										<td>
											<strong>Width Fit</strong>
										</td>
										<td>{response.width_fit}</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserTest;
