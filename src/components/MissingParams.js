"use client";

import { useMissingParams } from "../hooks/useMissingParams";

const MissingParams = ({ children }) => {
	const { missingParams, loading } = useMissingParams();

	if (loading) {
		return null; // Or render a loading spinner/message if needed
	}

	if (missingParams) {
		return (
			<div className="container mt-3">
				<div className="alert alert-danger" role="alert">
					<h4 className="alert-heading">
						Error: Missing required parameters
					</h4>
					<p>
						Please provide <strong>shopid</strong>,{" "}
						<strong>userid</strong>, and <strong>modelname</strong>{" "}
						in the URL.
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default MissingParams;
