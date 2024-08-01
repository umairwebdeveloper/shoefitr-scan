"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useQueryString from "../../../hooks/useQueryString";
import Select from "react-select";
import { systemsData, sizeData } from "../../../utils/sizes";
import { FaCamera } from "react-icons/fa6";
import Image from "next/image";

const ShoeSizeSelector = () => {
	const router = useRouter();
	const [selectedSystem, setSelectedSystem] = useState(null);
	const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
	const [selectedGender, setSelectedGender] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [loading, setLoading] = useState(false);

	const params = useQueryParams();
	const queryString = useQueryString();
	const { shopid, userid, modelname } = params;

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
			router.push(`/scan/camera-scan?${queryString}`);
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
				<div className="p-3 d-flex flex-column justify-content-center align-items-center">
					<div className="position-relative">
						<div className="mb-4">
							<a href="#">
								<Image
									src="/assets/svg/scan-button.svg"
									className="img-fluid"
									alt="scanning-button"
									width={184}
									height={184}
								/>
							</a>
						</div>
						<div>
							<Image
								src="/assets/png/Frame.png"
								className="img-fluid shoefitr-image-border"
								alt="scanning-button"
								width={184}
								height={184}
							/>
						</div>
						<Image
							src="/assets/svg/side1.svg"
							className="img-fluid position-absolute"
							alt="side"
							width={50}
							height={50}
							style={{ top: "30px", right: "185px" }}
						/>
						<Image
							src="/assets/svg/side2.svg"
							className="img-fluid position-absolute"
							alt="side"
							width={50}
							height={50}
							style={{ top: "30px", left: "185px" }}
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
					<div className="">
						<button
							className="shoefitr-primary-button d-flex justify-content-center align-items-center gap-2 w-100"
							disabled={isButtonDisabled || loading}
							onClick={handleScanNow}
						>
							{loading ? (
								<span
									className="spinner-border spinner-border-sm"
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
