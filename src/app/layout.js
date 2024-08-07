import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Head from "next/head";
import { Poppins } from "next/font/google";
import MobileOnlyContent from "../components/MobileOnlyContent";
import MissingParams from "../components/MissingParams";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Include all available font weights
	style: ["normal", "italic"], // Specify the font styles you need
	display: "swap",
});

export const metadata = {
	title: "Shoefitr",
	description: "Shoefitr is a shoe fitting app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/assets/png/logo.png"
				/>
			</Head>
			<body className={poppins.className}>
				<MobileOnlyContent>
					<MissingParams>
						<Toaster />
						<div>{children}</div>
					</MissingParams>
				</MobileOnlyContent>
			</body>
		</html>
	);
}
