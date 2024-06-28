"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Working() {
	const router = useRouter();

	return (
		<main>
			<div>
				<div class="p-3">
					<h1 class="text-center shoefitr-secondary-heading">
						How its working
					</h1>
					<div class="pt-3">
						<div>
							<Image
								src="/assets/jpg/working1.jpg"
								class="img-fluid w-100"
								alt="working 1"
								style={{ borderRadius: "10px" }}
								width={500}
								height={500}
							/>
						</div>
						<div class="pt-3">
							<h3 class="shoefitr-working-title mb-1">
								Step 1. prepare for the scanning
							</h3>
							<p class="shoefitr-working-desc">
								Lift your trousers up for clear visible of feet.
								You can take the picture with or without socks.
							</p>
						</div>
					</div>
					<div class="pt-3">
						<div class="position-relative">
							<img
								src="/assets/jpg/working2.jpg"
								class="img-fluid w-100"
								alt="working 1"
								style={{ borderRadius: "10px" }}
							/>
							<img
								src="/assets/png/feet-icons.png"
								class="position-absolute"
								style={{ top: "28%", left: "28%" }}
								alt="svg feet"
								width="45%"
							/>
						</div>
						<div class="pt-3">
							<h3 class="shoefitr-working-title mb-1">
								Step 2. scan your feet
							</h3>
							<p class="shoefitr-working-desc">
								Take picture of your feet close to each other,
								exactly like shown in the picture.
							</p>
						</div>
					</div>
					<div class="pt-3">
						<div>
							<Image
								src="/assets/jpg/working3.jpg"
								class="img-fluid w-100"
								alt="working 1"
								style={{ borderRadius: "10px" }}
								width={500}
								height={500}
							/>
						</div>
						<div class="pt-3">
							<h3 class="shoefitr-working-title mb-1">
								Step 3. Knee over knee position
							</h3>
							<p class="shoefitr-working-desc">
								Place one knee over the other to scan the bottom
								part of your feet. Then do the same with the
								second foot.
							</p>
						</div>
					</div>
				</div>
				<div class="px-3">
					<div class="w-100 shoefitr-working-box text-center pb-4">
						<div class="box-title p-3">
							<span>🎉</span>
							<h3>That’s all. it’s that simple!</h3>
						</div>
						<div class="mx-4 box-desc p-3">
							<p class="p-0 m-0 text-uppercase">Correct size</p>
							<span>42.5</span>
						</div>
					</div>
				</div>
				<div class="px-3 pt-4">
					<div class="d-flex justify-content-center">
						<button
							onClick={() => router.push("/camera-scan")}
							class="shoefitr-primary-button w-100"
						>
							Proceed to Scanning
						</button>
					</div>
				</div>
				<div class="p-3">
					<p class="text-center shoefitr-primary-desc">
						By proceeding I agree <br />
						to the
						<a href="#" class="text-dark">
							Privacy Policy
						</a>{" "}
						statement
					</p>
				</div>
			</div>
		</main>
	);
}
