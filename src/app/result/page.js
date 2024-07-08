"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Result() {
	const [resultData, setResultData] = useState(null);

	const router = useRouter();

	useEffect(() => {
		const data = localStorage.getItem("resultData");
		if (data) {
			const parsedData = JSON.parse(data);
			const formattedData = parsedData.map((value) => value.toFixed(1));
			setResultData(formattedData);
		}
	}, []);

	if (!resultData) {
		return (
			<div className="d-flex justify-content-center align-items-center vh-100">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<main>
			<div>
				<div class="p-3">
					<a
						onClick={() => router.back()}
						class="shoefitr-back-button d-flex align-items-center"
					>
						<span className="me-2">
							<FaChevronLeft />
						</span>
						<span>Back</span>
					</a>
				</div>
				<div class="d-flex flex-column justify-content-center align-items-center p-3">
					<Image
						src="/assets/svg/light-bulb2.svg"
						class="mb-2"
						width={48}
						height={48}
						alt="light bulb"
					/>
					<h3 class="shoefitr-secondary-heading">
						Results: Correct size found!
					</h3>
				</div>
				<div class="p-3">
					<div class="shoefitr-result-box p-3 text-center mb-3">
						<p class="m-0 p-0 text-uppercase">Correct size</p>
						<span>
							{resultData[0]}, {resultData[1]}
						</span>
					</div>
					<div class="shoefitr-result-box2 p-3 text-center">
						<p class="m-0 p-0 text-uppercase">
							shoe model id that fits you
						</p>
						<span class="d-flex justify-content-center align-items-center mt-1">
							Bloom45
							<span>
								<Image
									src="/assets/svg/copy.svg"
									class="ms-2"
									width={40}
									height={40}
									alt="copy"
								/>
							</span>
						</span>
					</div>
					<div class="shoefitr-result-box3 p-3 text-center">
						<p class="mb-1 text-uppercase">shoe analysis:</p>
						<span>
							The red part of the shoe might be tight for you
						</span>
					</div>
					<div class="shoefitr-result-box4 p-4 text-center">
						<Image
							src="/assets/png/shoes.png"
							class="img-fluid"
							width={230}
							height={230}
							alt="shoes"
						/>
					</div>
				</div>
				<div class="px-3">
					<div class="d-flex justify-content-between align-items-center gap-2 mb-2">
						<button class="shoefitr-primary-button w-100">
							Save Result
						</button>
						<span>
							<Image
								src="/assets/svg/share.svg"
								class="img-fluid"
								width={64}
								height={64}
								alt="share"
							/>
						</span>
					</div>
					<div>
						<button
							onClick={() => router.push("/camera-scan")}
							class="shoefitr-secondary-button w-100"
						>
							<i class="fa-solid fa-rotate me-1"></i> Make another
							Scan
						</button>
					</div>
				</div>
				<div class="px-3">
					<p class="text-center shoefitr-primary-desc">
						Don’t remember the steps? <br />
						Check{" "}
						<a
							onClick={() => router.push("/working")}
							class="text-dark"
						>
							How it works
						</a>
					</p>
				</div>
			</div>
		</main>
	);
}
