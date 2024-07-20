"use client";

import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Result() {
	const router = useRouter();

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
						<span>42.5</span>
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
					<div className="shoefitr-result-box3 p-3 text-center">
						<p className="mb-1 text-uppercase">
							Right & left feet heatmap
						</p>
					</div>
					<div className="d-flex justify-content-between align-items-center gap-2 w-100">
						<div className="flex-fill">
							<Image
								src="/assets/png/heat-shoes1.png"
								className="img-fluid w-100"
								alt="heat-shoes1"
								width={100}
								height={100}
							/>
						</div>
						<div className="flex-fill">
							<Image
								src="/assets/png/heat-shoes2.png"
								className="img-fluid w-100"
								alt="heat-shoes2"
								width={100}
								height={100}
							/>
						</div>
					</div>
				</div>
				<div className="p-3">
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
							onClick={() => router.push("/insole/camera-scan")}
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
							onClick={() => router.push("/insole/working")}
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
