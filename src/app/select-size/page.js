"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { systemsData, sizeData } from "../../utils/sizes";
import { FaCamera } from "react-icons/fa6";
import Image from "next/image";

const ShoeSizeSelector = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedSystem, setSelectedSystem] = useState(null);
	const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
	const [selectedGender, setSelectedGender] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [loading, setLoading] = useState(false);

	const shopid = searchParams.get("shopid");
	const userid = searchParams.get("userid");
	const modelname = searchParams.get("modelname");

	const missingParams = !(shopid && userid && modelname);

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

	const handleScanNow = () => {
		const selectedData = {
			shopid,
			userid,
			modelname,
			selectedSystem: selectedSystem.value,
			selectedAgeGroup,
			selectedGender,
			selectedSize: selectedSize.value,
		};
		setLoading(true);
		localStorage.setItem("shoeSizeData", JSON.stringify(selectedData));
		setTimeout(() => {
			router.push(
				`/camera-scan?shopid=${shopid}&userid=${userid}&modelname=${modelname}`
			);
		}, 1000);
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

	if (missingParams) {
		return (
			<div className="container mt-3">
				<div className="alert alert-danger" role="alert">
					Required parameters are missing. Please provide shopid,
					userid, and modelname.
				</div>
			</div>
		);
	}

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
				<div className="mb-5 d-flex justify-content-between gap-3 align-items-center">
					<div>
						<h1 className="shoefitr-primary-heading">
							Scan your feet
						</h1>
						<p className="">Select your current shoe size system</p>
					</div>
					<div>
						<Image
							src="/assets/png/shoes-photo.png"
							className="img-fluid"
							width={200}
							height={200}
							alt="shoes"
						/>
					</div>
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
						<ul className="list-group">
							<li className="list-group-item d-flex justify-content-between align-items-center">
								System:
								<span>
									{selectedSystem
										? selectedSystem.label
										: "-"}
								</span>
							</li>
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Age Group:
								<span>
									{selectedAgeGroup ? selectedAgeGroup : "-"}
								</span>
							</li>
							{selectedGender && (
								<li className="list-group-item d-flex justify-content-between align-items-center">
									Gender:
									<span>{selectedGender}</span>
								</li>
							)}
							<li className="list-group-item d-flex justify-content-between align-items-center">
								Size:
								<span>
									{selectedSize ? selectedSize.label : "-"}
								</span>
							</li>
						</ul>
					</div>
					<div className="text-center d-flex justify-content-center align-items-center">
						<button
							className="shoefitr-primary-button px-4 d-flex justify-content-center align-items-center gap-2"
							disabled={isButtonDisabled || loading}
							onClick={handleScanNow}
						>
							{loading ? (
								<span
									class="spinner-border spinner-border-sm"
									role="status"
									aria-hidden="true"
								></span>
							) : (
								<FaCamera />
							)}
							{loading ? "Loading..." : "Scan Now"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShoeSizeSelector;
