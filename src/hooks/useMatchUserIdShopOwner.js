"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const useMatchUserIdShopOwner = () => {
	const [match, setMatch] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const { userid, shopid } = Object.fromEntries(useSearchParams());

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const response = await axios.post(
					"http://127.0.0.1:8000/api/match/ids/",
					{
						userid,
						shopid,
					}
				);
				setMatch(response.data);
			} catch (error) {
				setError(
					error.response ? error.response.data : "An error occurred"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchMatch();
	}, [userid, shopid]);

	return { match, loading, error };
};

export default useMatchUserIdShopOwner;
