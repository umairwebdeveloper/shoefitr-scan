"use client"

import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Result() {
	const router = useRouter();

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
						<span>42.5</span>
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
					<div class="shoefitr-result-box3 p-3 text-center">
						<p class="mb-1 text-uppercase">
							Right & left feet heatmap
						</p>
					</div>
					<div class="d-flex justify-content-between align-items-center gap-2 w-100">
						<div class="flex-fill">
							<Image
								src="/assets/png/heat-shoes1.png"
								class="img-fluid w-100"
								alt="heat-shoes1"
								width={100}
								height={100}
							/>
						</div>
						<div class="flex-fill">
							<Image
								src="/assets/png/heat-shoes2.png"
								class="img-fluid w-100"
								alt="heat-shoes2"
								width={100}
								height={100}
							/>
						</div>
					</div>
				</div>
				<div class="p-3">
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
							onClick={() => router.push("/insole/camera-scan")}
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
							onClick={() => router.push("/insole/working")}
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
