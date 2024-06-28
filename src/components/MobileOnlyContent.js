"use client";

import React, { useState, useEffect } from "react";
import useMobileDevice from "../hooks/useMobileDevice";
import QRCode from "react-qr-code";

const MobileOnlyContent = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const isMobile = useMobileDevice();
	const [url, setUrl] = useState("");

	useEffect(() => {
		if (typeof window !== "undefined") {
			setUrl(window.location.href);
			setIsLoading(false);
		}
	}, [isMobile]);

	if (isLoading) {
		return (
			<div class="d-flex justify-content-center align-items-center vh-100">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	if (!isMobile) {
		return (
			<div className="container text-center mt-5">
				<div className="row justify-content-center">
					<div className="col-12 col-md-8 col-lg-6">
						<div className="card p-4">
							<div className="card-body">
								<h1 className="card-title">
									This website is only available on mobile
									devices.
								</h1>
								<p className="card-text">
									Please scan the QR code below to access this
									website on your mobile device.
								</p>
								{url && (
									<div className="d-flex justify-content-center mt-4">
										<QRCode value={url} size={128} />
									</div>
								)}
								<p className="mt-4">URL: {url}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default MobileOnlyContent;
