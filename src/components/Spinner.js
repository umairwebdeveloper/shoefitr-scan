import React from "react";

const Spinner = ({
	size = "md",
	color = "dark",
	position = "center",
	className = "",
}) => {
	const sizeClass = {
		sm: "spinner-border-sm",
		md: "",
		lg: "spinner-border-lg",
		xl: "spinner-border-xl",
	}[size];

	const colorClass = `text-${color}`;

	const positionClass = {
		start: "justify-content-start",
		center: "justify-content-center",
		end: "justify-content-end",
	}[position];

	return (
		<div className={`d-flex ${positionClass} ${className}`}>
			<div
				className={`spinner-border ${sizeClass} ${colorClass}`}
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
