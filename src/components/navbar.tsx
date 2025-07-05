// Nihonggo Navbar Component
// Fitur: Navigasi utama, auto-hide saat scroll, responsif, validasi login
// Komponen utama: Navbar
// - navLinks: Daftar menu
// - Auto-hide: Navbar sembunyi saat scroll ke bawah, muncul saat ke atas

"use client";
import React, { useState, useEffect, useRef } from "react";

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [role, setRole] = useState<string | null>(null);
    const lastScroll = useRef(0);

    useEffect(() => {
        if (typeof window === "undefined") return;
        // Ambil role dari localStorage (key konsisten dengan login)
        setRole(localStorage.getItem("nihonggo_role"));
        const handleScroll = () => {
            const current = window.scrollY;
            if (current < 10 || current < lastScroll.current) {
                setShow(true);
            } else if (current > lastScroll.current) {
                setShow(false);
            }
            lastScroll.current = current;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hanya tampilkan menu Admin jika role === 'admin'
    const filteredLinks = [
        { name: "Home", href: "/" },
        { name: "Quiz", href: "/quiz" },
        { name: "Blog", href: "/blog" },
        { name: "Prestasi", href: "/prestasi" },
        ...(role === "admin" ? [{ name: "Admin", href: "/admin" }] : []),
        { name: "Profile", href: "/profile" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${show ? "translate-y-0" : "-translate-y-full"} bg-white shadow`}> 
            {/* Hamburger Button */}
            <button
                className="md:hidden p-3 focus:outline-none absolute left-2 top-2 bg-white rounded-full shadow-md"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
            >
                <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
            </button>
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 items-center justify-center w-full py-3">
                {filteredLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-base font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 px-2"
                    >
                        {link.name}
                    </a>
                ))}
                <a
                    href="/login"
                    className="px-4 py-2 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow"
                >
                    Login
                </a>
            </div>
            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm transition-all duration-500 ${
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setOpen(false)}
                aria-hidden={!open}
            >
                {/* Slide-in Drawer */}
                <div
                    className={`absolute top-0 left-0 h-full w-4/5 max-w-[320px] bg-white shadow-2xl rounded-tr-2xl rounded-br-2xl transform transition-transform duration-500 ease-in-out ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="px-4 pt-8 pb-4 space-y-2 bg-white">
                        {filteredLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-4 py-3 rounded-lg text-base font-semibold text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                                onClick={() => setOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="/login"
                            className="block px-4 py-3 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-2 shadow"
                            onClick={() => setOpen(false)}
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
