"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Result() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = () => {
			try {
				const responseData = localStorage.getItem("responseData");
				if (responseData) {
					const parsedData = JSON.parse(responseData);
					if (parsedData.length_foot) {
						setData(parsedData);
					} else {
						setError("Invalid data format");
					}
				} else {
					setError("No data available");
				}
			} catch (e) {
				setError("Error retrieving data");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="text-center mt-5">
				<div className="spinner-border" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (error) {
		toast.error(error);
		router.push("/camera-scan");
	}

	if (!data) {
		toast.error("No data available");
		router.push("/camera-scan");
	}

	return (
		<main>
			<div>
				<div className="p-3">
					<a
						onClick={() => router.back()}
						className="shoefitr-back-button d-flex align-items-center"
					>
						<span className="me-2">
							<FaChevronLeft />
						</span>
						<span>Back</span>
					</a>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center p-3">
					<Image
						src="/assets/svg/light-bulb2.svg"
						className="mb-2"
						width={48}
						height={48}
						alt="light bulb"
					/>
					<h3 className="shoefitr-secondary-heading">
						Results: Correct size found!
					</h3>
				</div>
				<div className="p-3">
					<div className="shoefitr-result-box p-3 text-center mb-3">
						<p className="m-0 p-0 text-uppercase">Correct size</p>
						<span>
							{data.length_foot.length_l},{" "}
							{data.length_foot.length_r}
						</span>
					</div>
					<div className="shoefitr-result-box2 p-3 text-center">
						<p className="m-0 p-0 text-uppercase">
							shoe model id that fits you
						</p>
						<span className="d-flex justify-content-center align-items-center mt-1">
							Bloom45
							<span>
								<Image
									src="/assets/svg/copy.svg"
									className="ms-2"
									width={40}
									height={40}
									alt="copy"
								/>
							</span>
						</span>
					</div>
					<div className="shoefitr-result-box3 p-3 text-center">
						<p className="mb-1 text-uppercase">shoe analysis:</p>
						<span>
							The red part of the shoe might be tight for you
						</span>
					</div>
					<div className="shoefitr-result-box4 p-4 text-center">
						<Image
							src="/assets/png/shoes.png"
							className="img-fluid"
							width={230}
							height={230}
							alt="shoes"
						/>
					</div>
				</div>
				<div className="px-3">
					<div className="d-flex justify-content-between align-items-center gap-2 mb-2">
						<button className="shoefitr-primary-button w-100">
							Save Result
						</button>
						<span>
							<Image
								src="/assets/svg/share.svg"
								className="img-fluid"
								width={64}
								height={64}
								alt="share"
							/>
						</span>
					</div>
					<div>
						<button
							onClick={() => router.push("/camera-scan")}
							className="shoefitr-secondary-button w-100"
						>
							<i className="fa-solid fa-rotate me-1"></i> Make
							another Scan
						</button>
					</div>
				</div>
				<div className="px-3">
					<p className="text-center shoefitr-primary-desc">
						Don’t remember the steps? <br />
						Check{" "}
						<a
							onClick={() => router.push("/working")}
							className="text-dark"
						>
							How it works
						</a>
					</p>
				</div>
			</div>
		</main>
	);
}
