"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export const useMissingParams = (customMissingParams = []) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [missingParams, setMissingParams] = useState(false);
	const [loading, setLoading] = useState(true);

	// Default params
	const defaultParams =
		pathname === "/scan/test" ? [] : ["shopid", "userid", "modelname"];
	// Combine default params with custom missing params
	const allParams = [...new Set([...defaultParams, ...customMissingParams])];

	useEffect(() => {
		const areParamsMissing = allParams.some(
			(param) => !searchParams.get(param)
		);
		setMissingParams(areParamsMissing);
		setLoading(false);
	}, [searchParams, allParams]);

	return { missingParams, loading };
};
