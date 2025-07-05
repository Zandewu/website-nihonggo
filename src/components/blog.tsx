// Nihonggo Blog Component
// Fitur: Menampilkan daftar blog/berita, desain responsif, untuk user umum
// Komponen utama: Blog
// - dummyPosts: Data dummy blog
// - Blog: Komponen utama blog

"use client";
import React from "react";
import Image from "next/image";

interface BlogPost {
	image: string;
	title: string;
	date: string;
	excerpt: string;
	link: string;
}

const dummyPosts: BlogPost[] = [];

const Blog: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2 sm:px-6 flex flex-col items-center">
			<h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
				Berita & Blog Nihonggo
			</h1>
			<div className="grid gap-6 w-full max-w-2xl">
				{dummyPosts.length === 0 ? (
					<div className="text-center text-gray-500 py-12">Belum ada blog.</div>
				) : (
					dummyPosts.map((post, idx) => (
						<div
							key={idx}
							className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row transition hover:scale-[1.02] hover:shadow-2xl duration-200"
						>
							<Image
								src={post.image}
								alt={post.title}
								width={160}
								height={160}
								className="w-full sm:w-40 h-40 object-cover object-center"
							/>
							<div className="flex-1 p-4 flex flex-col justify-between">
								<div>
									<h2 className="text-lg sm:text-xl font-semibold text-purple-700 mb-1">
										{post.title}
									</h2>
									<p className="text-xs text-gray-400 mb-2">
										{new Date(post.date).toLocaleDateString("id-ID", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
									<p className="text-gray-700 text-sm mb-3">
										{post.excerpt}
									</p>
								</div>
								<a
									href={post.link}
									className="inline-block mt-auto text-blue-600 font-medium hover:underline text-sm"
								>
									Baca selengkapnya
								</a>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Blog;
