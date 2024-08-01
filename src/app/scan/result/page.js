"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useQueryString from "../../../hooks/useQueryString";
import toast from "react-hot-toast";

export default function Result() {
	const router = useRouter();
	const [resultData, setResultData] = useState(null);
	const queryString = useQueryString();

	useEffect(() => {
		const data = localStorage.getItem("responseData");
		if (data) {
			setResultData(JSON.parse(data));
		}
	}, []);

	if (!resultData) {
		return (
			<div className="container mt-3">
				<div className="alert alert-danger" role="alert">
					No data found. Please go back and try again.
				</div>
			</div>
		);
	}

	const handleCopy = async (textToCopy) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			toast.success("Copied to clipboard!");
		} catch (err) {
			toast.error("Failed to copy to clipboard.");
		}
	};

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
						Results: {resultData?.message || "-"}
					</h3>
				</div>
				<div className="m-3">
					<div className="card-body">
						<h2 className="card-title bg-light p-3 rounded text-center mb-3">
							Foot Lengths
						</h2>
						<div className="row">
							<div className="col-md-6 mb-3">
								<h3>Left Foot</h3>
								<ul className="list-group">
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Length:{" "}
										<span>
											{resultData?.length_l || "-"}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Ball:{" "}
										<span>{resultData?.ball_l || "-"}</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Waist:{" "}
										<span>
											{resultData?.waist_l || "-"}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Instep:{" "}
										<span>
											{resultData?.instep_l || "-"}
										</span>
									</li>
								</ul>
							</div>
							<div className="col-md-6 mb-3">
								<h3>Right Foot</h3>
								<ul className="list-group">
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Length:{" "}
										<span>
											{resultData?.length_r || "-"}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Ball:{" "}
										<span>{resultData?.ball_r || "-"}</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Waist:{" "}
										<span>
											{resultData?.waist_r || "-"}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
										Instep:{" "}
										<span>
											{resultData?.instep_r || "-"}
										</span>
									</li>
								</ul>
							</div>
							<div className="col-md-6 py-3 d-flex justify-content-center align-items-center">
								<img
									src={
										resultData?.uri ||
										"https://demofree.sirv.com/nope-not-here.jpg"
									}
									className="img-fluid rounded"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="p-3">
					<div className="shoefitr-result-box p-3 text-center mb-3">
						<p className="m-0 p-0 text-uppercase">Correct size</p>
						<span>{resultData?.correct_size || "-"}</span>
					</div>
					<div className="shoefitr-result-box2 p-3 text-center">
						<p className="m-0 p-0 text-uppercase">
							{resultData?.model_id || "-"} that fits you
						</p>
						<span className="d-flex justify-content-center align-items-center mt-1">
							{resultData?.correct_size
								? `Bloom${resultData?.correct_size}`
								: "-"}
							<span>
								<Image
									src="/assets/svg/copy.svg"
									className="ms-2"
									style={{ cursor: "pointer" }}
									onClick={() =>
										handleCopy(
											`${resultData?.correct_size || "-"}`
										)
									}
									width={40}
									height={40}
									alt="copy"
								/>
							</span>
						</span>
					</div>
					<div className="shoefitr-result-box3 p-3 text-center">
						{resultData?.picture_advice?.includes("-r") && (
							<>
								<p className="mb-1 text-uppercase">
									shoe analysis:
								</p>
								<p className="m-0 p-0">
									<span>🔴</span>
									<span>
										{" "}
										The red part of the shoe might be tight
										for you
									</span>
								</p>
							</>
						)}
						{resultData?.picture_advice?.includes("-g") && (
							<>
								<p className="mb-1 text-uppercase">
									shoe analysis:
								</p>
								<p className="m-0 p-0">
									<span>🟢</span>
									<span>
										{" "}
										The green part of the shoe might be
										loose for you
									</span>
								</p>
							</>
						)}
					</div>
					{resultData?.totally_fit === false && (
						<div className="shoefitr-result-box4 p-4 text-center">
							<Image
								src={`/static/${resultData?.picture_advice}.jpg`}
								className="img-fluid"
								width={230}
								height={230}
								alt="shoes"
							/>
						</div>
					)}
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
							onClick={() =>
								router.push(`/scan/select-size?${queryString}`)
							}
							className="shoefitr-secondary-button w-100"
						>
							<i className="fa-solid fa-rotate me-1"></i> Make
							another Scan
						</button>
					</div>
				</div>
				<div className="px-3 mt-2">
					<p className="text-center shoefitr-primary-desc">
						Don’t remember the steps? <br />
						Check{" "}
						<a
							onClick={() =>
								router.push(`/scan/working?${queryString}`)
							}
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
