"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import useQueryString from "../../hooks/useQueryString";
import useMatchUserIdShopOwner from "../../hooks/useMatchUserIdShopOwner";
import Spinner from "../../components/Spinner";

export default function Home() {
	const [buttonLoading, setButtonLoading] = useState(false);
	const router = useRouter();
	const queryString = useQueryString();
	const { match, loading } = useMatchUserIdShopOwner();

	const { shopid, userid, modelname } = Object.fromEntries(useSearchParams());

	const handleScanNowOldSize = () => {
		const selectedData = {
			shopid,
			userid,
			modelname,
			selectedSystem: match.reference.region,
			selectedAgeGroup: match.reference.selection,
			selectedSize: match.reference.size,
		};
		setButtonLoading(true);
		localStorage.setItem("shoeSizeData", JSON.stringify(selectedData));
		router.push(`/scan/camera-scan?${queryString}`);
	};

	return (
		<main>
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
				<div className="p-3">
					<h1 className="shoefitr-primary-heading mb-1">
						Check your size by using <br />
						<a href="#" className="shoefitr-link">
							our service
						</a>
					</h1>
					<p className="shoefitr-primary-desc">
						Check your size by using our service that connect foot
						and shoe fitting together
					</p>
				</div>

				<div className="px-3">
					{loading ? (
						<>
							<Spinner
								size="md"
								color="dark"
								position="center"
								className="mb-3"
							/>
						</>
					) : (
						<>
							{match.match === true ? (
								<>
									<p className="text-center text-success mb-3">
										Welcome back! <br />
										Your previous size
									</p>
									{match.reference && (
										<>
											<ul className="list-group mb-3">
												<li className="list-group-item d-flex justify-content-between align-items-center">
													Size System:
													<span>
														{match.reference.region}
													</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													Age Group:
													<span>
														{
															match.reference
																.selection
														}
													</span>
												</li>
												<li className="list-group-item d-flex justify-content-between align-items-center">
													Size:
													<span>
														{match.reference.size}
													</span>
												</li>
											</ul>
											<button
												className="shoefitr-secondary-button w-100"
												onClick={handleScanNowOldSize}
												disabled={buttonLoading}
											>
												{buttonLoading
													? "Loading..."
													: "Scan with previous size"}
											</button>
											<p className="text-center fs-6 my-1">
												or
											</p>
										</>
									)}
									<button
										onClick={() =>
											router.push(
												`/scan/select-size?${queryString}`
											)
										}
										className="shoefitr-primary-button w-100 mb-3"
									>
										Scan with new size
									</button>
									<p className="text-center shoefitr-primary-desc mb-4">
										how it&#x27;s works?{" "}
										<a
											onClick={() =>
												router.push(
													`/scan/working?${queryString}`
												)
											}
											className="text-dark cursor-pointer"
										>
											Click here
										</a>
									</p>
								</>
							) : (
								<>
									<p className="text-center text-success mb-3">
										Welcome
									</p>
									<button
										onClick={() =>
											router.push(
												`/scan/working?${queryString}`
											)
										}
										className="shoefitr-primary-button w-100 mb-4"
									>
										See how it&#x27;s working
									</button>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</main>
	);
}
