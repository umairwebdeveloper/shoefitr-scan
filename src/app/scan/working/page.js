"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import useQueryString from "../../../hooks/useQueryString";

export default function Working() {
	const router = useRouter();
	const queryString = useQueryString();

	return (
		<main>
			<div>
				<div className="p-3">
					<h1 className="text-center shoefitr-secondary-heading">
						How its working
					</h1>
					<div className="pt-3">
						<div>
							<Image
								src="/assets/jpg/working1.jpg"
								className="img-fluid w-100"
								alt="working 1"
								style={{ borderRadius: "10px" }}
								width={500}
								height={500}
							/>
						</div>
						<div className="pt-3">
							<h3 className="shoefitr-working-title mb-1">
								Step 1. prepare for the scanning
							</h3>
							<p className="shoefitr-working-desc">
								Lift your trousers up for clear visible of feet.
								You can take the picture with or without socks.
							</p>
						</div>
					</div>
					<div className="pt-3">
						<div className="position-relative">
							<img
								src="/assets/jpg/working2.jpg"
								className="img-fluid w-100"
								alt="working 1"
								style={{ borderRadius: "10px" }}
							/>
							<img
								src="/assets/png/feet-icons.png"
								className="position-absolute"
								style={{ top: "28%", left: "28%" }}
								alt="svg feet"
								width="45%"
							/>
						</div>
						<div className="pt-3">
							<h3 className="shoefitr-working-title mb-1">
								Step 2. scan your feet
							</h3>
							<p className="shoefitr-working-desc">
								Take picture of your feet close to each other,
								exactly like shown in the picture.
							</p>
						</div>
					</div>
				</div>
				<div className="px-3">
					<div className="w-100 shoefitr-working-box text-center pb-4">
						<div className="box-title p-3">
							<span>🎉</span>
							<h3>That’s all. it’s that simple!</h3>
						</div>
						<div className="mx-4 box-desc p-3">
							<p className="p-0 m-0 text-uppercase">
								Correct size
							</p>
							<span>42.5</span>
						</div>
					</div>
				</div>
				<div className="px-3 pt-4">
					<div className="d-flex justify-content-center">
						<button
							onClick={() =>
								router.push(`/scan/select-size?${queryString}`)
							}
							className="shoefitr-primary-button w-100"
						>
							Proceed to Scanning
						</button>
					</div>
				</div>
				<div className="p-3">
					<p className="text-center shoefitr-primary-desc">
						By proceeding I agree <br />
						to the{" "}
						<a href="#" className="text-dark">
							Privacy Policy
						</a>{" "}
						statement
					</p>
				</div>
			</div>
		</main>
	);
}
