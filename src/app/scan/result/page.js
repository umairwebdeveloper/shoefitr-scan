"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useQueryString from "../../../hooks/useQueryString";

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
						Results
					</h3>
				</div>
				<div className="my-3">
					<div className="card-body">
						<div className="row">
							<div className="col-md-6 d-flex justify-content-center align-items-center">
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
					<div className="shoefitr-result-box3 px-3 text-center">
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
