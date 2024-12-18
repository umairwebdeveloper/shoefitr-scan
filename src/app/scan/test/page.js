"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { systemsData, sizeData } from "../../../utils/sizes";
import { FaPaperPlane } from "react-icons/fa6";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const ShoeSizeSelectorTest = () => {
	const [selectedSystem, setSelectedSystem] = useState(null);
	const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
	const [selectedGender, setSelectedGender] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [userId, setUserId] = useState("1");
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [response, setResponse] = useState(null);
	const [responseError, setResponseError] = useState(null);
	const [shopIds, setShopIds] = useState([]);
	const [modelNames, setModelNames] = useState([]);
	const [selectedShopId, setSelectedShopId] = useState(null);
	const [selectedModelName, setSelectedModelName] = useState(null);
	const [loadingShopIds, setLoadingShopIds] = useState(true);
	const [loadingModelNames, setLoadingModelNames] = useState(false);

	useEffect(() => {
		axios
			.get("https://api.shoefitr.io/api/shop/ids/")
			.then((response) => {
				const shopOptions = response.data.map((username) => ({
					value: username,
					label: username,
				}));
				setShopIds(shopOptions);
				setLoadingShopIds(false);
			})
			.catch((error) => {
				toast.error("Error fetching shop IDs.");
				setLoadingShopIds(false);
			});
	}, []);

	useEffect(() => {
		const defaultSystem = systemsData.find(
			(system) => system.value === "EU"
		);
		setSelectedSystem(defaultSystem);
	}, []);

	const handleShopChange = (selectedOption) => {
		setSelectedShopId(selectedOption);
		if (selectedOption) {
			setLoadingModelNames(true);
			// Fetch model names for the selected shop ID
			axios
				.get(
					`https://api.shoefitr.io/api/shop/model-names/${selectedOption.value}/`
				)
				.then((response) => {
					setModelNames(
						response.data.model_names.map((name) => ({
							value: name,
							label: name,
						}))
					);
					setLoadingModelNames(false);
				})
				.catch((error) => {
					toast.error("Error fetching model names.");
					setLoadingModelNames(false);
				});
		} else {
			setModelNames([]);
		}
	};

	const handleModelChange = (selectedOption) => {
		setSelectedModelName(selectedOption);
	};

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
		if (
			!userId ||
			!selectedShopId ||
			!selectedModelName ||
			!selectedSystem ||
			!selectedAgeGroup ||
			!selectedSize ||
			!image
		) {
			toast.error("Please fill all the fields and upload an image.");
			return;
		}

		const formData = new FormData();
		formData.append("shopid", selectedShopId.value);
		formData.append("userid", userId);
		formData.append("model_name", selectedModelName.value);
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
				<h3 className="fs-3 fw-bold text-center mb-3">Test Scan</h3>
				<div className="">
					<div className="mb-3">
						<label className="form-label">User Id:</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter user id"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="shop-select">Select Shop ID:</label>
						<Select
							id="shop-select"
							options={shopIds}
							onChange={handleShopChange}
							placeholder="Select a shop ID..."
							isLoading={loadingShopIds}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="model-select">Select Model Name:</label>
						<Select
							id="model-select"
							options={modelNames}
							onChange={handleModelChange}
							placeholder={
								selectedShopId
									? "Select a model name..."
									: "Select a shop ID first"
							}
							isDisabled={!selectedShopId}
							isLoading={loadingModelNames}
						/>
					</div>
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
						<label className="form-label">Select Size:</label>
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
						<label className="form-label">Upload Image:</label>
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
						<div className="alert alert-danger my-4">{error}</div>
					)}
					{response && (
						<div className="my-4">
							<h4 className="fs-4 fw-bold mb-3">Response:</h4>
							<ul className="list-group">
								<li className="list-group-item">
									{Object.keys(response).map((key) => (
										<p key={key}>
											<strong>
												{key
													.replace(/_/g, " ")
													.toUpperCase()}
												:
											</strong>{" "}
											{key === "uri" ? (
												<img
													src={response[key]}
													alt="Image"
													className="img-fluid w-100"
												/>
											) : (
												response[key].toString()
											)}
										</p>
									))}
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShoeSizeSelectorTest;
