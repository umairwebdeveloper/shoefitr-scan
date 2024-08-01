"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useQueryString from "../hooks/useQueryString";

export default function Main() {
	const router = useRouter();
	const queryString = useQueryString();

	useEffect(() => {
		router.push(`/scan?${queryString}`);
	}, [router, queryString]);

	return null;
}
