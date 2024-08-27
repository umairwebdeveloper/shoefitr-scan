"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const useMatchUserIdShopOwner = () => {
	const [match, setMatch] = useState(null);
	const [loading, setLoading] = useState(true);

	const { userid, shopid } = Object.fromEntries(useSearchParams());

	useEffect(() => {
		const fetchMatch = async () => {
			try {
				const response = await axios.post(
					"https://api.shoefitr.io/api/match/ids/",
					{
						userid,
						shopid,
					}
				);
				setMatch(response.data);
			} catch (error) {
				setMatch(error.response.data);
			} finally {
				setLoading(false);
			}
		};

		fetchMatch();
	}, [userid, shopid]);

	return { match, loading };
};

export default useMatchUserIdShopOwner;
