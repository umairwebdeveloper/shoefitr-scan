// hooks/useQueryParams.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
	const searchParams = useSearchParams();
	const [params, setParams] = useState({});

	useEffect(() => {
		const paramsObj = {};
		for (const [key, value] of searchParams.entries()) {
			paramsObj[key] = value;
		}
		setParams(paramsObj);
	}, [searchParams]);

	return params;
};
