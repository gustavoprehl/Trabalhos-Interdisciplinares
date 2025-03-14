"use client";

import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import { MarqueeDemo } from "./Reviews";
import Subscribe from "./Subscribe";

export default function App() {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<Header />
			<main className="flex-1 pt-16">
				<Hero />
				<Features />
				<Subscribe />
				<section className="w-full bg-background">
					<div className="container max-w-6xl mx-auto px-4 md:px-6">
						<MarqueeDemo />
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
