"use client";

import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Proceed() {
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
				<div
					class="p-4 d-flex flex-column justify-content-center align-items-center"
					style={{ height: "80vh" }}
				>
					<div class="shoefitr-proceed-box text-center w-100">
						<div class="mb-2">
							<Image
								src="/assets/svg/light-bulb.svg"
								alt="light bulb"
								width={48}
								height={48}
							/>
						</div>
						<h3>
							Thank you! Now proceed <br />
							to the bottom scanning
						</h3>
						<div class="pt-3">
							<a
								onClick={() =>
									router.push("/insole/camera-scan-right")
								}
								class="shoefitr-primary-button d-flex align-items-center justify-content-center"
							>
								Proceed
							</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
