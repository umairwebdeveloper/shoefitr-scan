"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useQueryString from "../../hooks/useQueryString";
import useMatchUserIdShopOwner from "../../hooks/useMatchUserIdShopOwner";
import Spinner from "../../components/Spinner";

export default function Home() {
	const router = useRouter();
	const queryString = useQueryString();
	const { match, loading } = useMatchUserIdShopOwner();

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
							<p className="text-center text-success mb-3">
								Wellcome Back, {match.username}!
							</p>
						) : (
							<>
								<p className="text-center text-success mb-3">
									Wellcome
								</p>
							</>
						)}
					</>
				)}
				<div className="px-3 mt-2">
					<div className="d-flex justify-content-center">
						<button
							onClick={() =>
								router.push(`/scan/working?${queryString}`)
							}
							className="shoefitr-primary-button w-100"
						>
							See how it working
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
