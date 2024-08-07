"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export const useMissingParams = (customMissingParams = []) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [missingParams, setMissingParams] = useState(false);
	const [loading, setLoading] = useState(true);

	// Memoize allParams to prevent changes on every render
	const allParams = useMemo(() => {
		const defaultParams =
			pathname === "/scan/test" ? [] : ["shopid", "userid", "modelname"];
		return [...new Set([...defaultParams, ...customMissingParams])];
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
