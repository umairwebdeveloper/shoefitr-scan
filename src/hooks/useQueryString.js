"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const useQueryString = () => {
	const searchParams = useSearchParams();
	const [queryString, setQueryString] = useState("");

	useEffect(() => {
		const queryString = new URLSearchParams(searchParams).toString();
		setQueryString(queryString);
	}, [searchParams]);

	return queryString;
};

export default useQueryString;
