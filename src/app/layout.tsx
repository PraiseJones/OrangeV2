import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";
import { AutoConnect } from "thirdweb/react";
import { client } from "@/consts/client";

export const metadata: Metadata = {
	title: "OrangeNFT",
	description: "Discover, collect and trade NFTs on OrangeNFT marketplace",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
			</head>
			<body style={{ 
				paddingTop: "100px",
				paddingBottom: "100px"
			}}>
				<Providers>
					<AutoConnect client={client} />
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
