"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { pathParamConfig, defaultParams } from "../config/paramConfig"; // Adjust the path according to your project structure

export const useMissingParams = (customMissingParams = []) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [missingParams, setMissingParams] = useState(false);
	const [loading, setLoading] = useState(true);

	// Helper function to check if a pathname matches a pattern
	const matchPath = (path, pattern) => {
		if (pattern.endsWith("/*")) {
			return path.startsWith(pattern.slice(0, -2));
		}
		return path === pattern;
	};

	// Memoize allParams to prevent changes on every render
	const allParams = useMemo(() => {
		// Find the first matching pattern or fallback to defaultParams
		const pathSpecificParams =
			Object.keys(pathParamConfig).find((pattern) =>
				matchPath(pathname, pattern)
			) !== undefined
				? []
				: defaultParams;

		return [...new Set([...pathSpecificParams, ...customMissingParams])];
	}, [pathname, customMissingParams]);

	useEffect(() => {
		const areParamsMissing = allParams.some(
			(param) => !searchParams.get(param)
		);
		setMissingParams(areParamsMissing);
		setLoading(false);
	}, [searchParams, allParams]);

	return { missingParams, loading };
};
