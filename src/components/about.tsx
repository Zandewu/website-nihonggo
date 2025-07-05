// Nihonggo About Component
// Fitur: Menampilkan deskripsi singkat tentang platform Nihonggo
// Komponen utama: About

"use client";
import React from "react";
// NOTE: Pastikan package 'react-icons' sudah diinstall agar import tidak error.
import { FiMail } from "react-icons/fi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const About: React.FC = () => {
    return (
        <section className="bg-white w-full max-w-2xl mx-auto flex flex-col items-center justify-center py-8 sm:py-12 px-4 font-sans rounded-2xl shadow">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900 tracking-tight transition-colors duration-300 hover:text-blue-600 focus:text-blue-600 text-center cursor-pointer select-none">
                Tentang Nihonggo
            </h2>
            <p className="max-w-xl text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-10 break-words text-center">
                Nihonggo adalah platform pembelajaran bahasa Jepang yang membantu Anda memahami bahasa dan budaya Jepang dengan mudah dan menyenangkan.
            </p>
            <div className="w-full flex flex-col items-center mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                    <span className="inline-block"><FiMail className="inline text-blue-500 text-2xl" /></span> Contact Person
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700 text-base">
                        <FiMail className="text-blue-500 text-xl" />
                        <a href="mailto:nihonggo@example.com" className="hover:underline">nihonggo@example.com</a>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-base">
                        <FaInstagram className="text-pink-500 text-xl" />
                        <a href="https://instagram.com/nihonggo" target="_blank" rel="noopener noreferrer" className="hover:underline">@nihonggo</a>
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 text-base">
                        <FaWhatsapp className="text-green-500 text-xl" />
                        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:underline">0812-3456-7890</a>
                    </li>
                </ul>
            </div>
            <footer className="mt-2 text-xs sm:text-sm text-gray-400 tracking-wide">
                &copy; 2025 Nihonggo. All rights reserved.
            </footer>
        </section>
    );
};

export default About;
