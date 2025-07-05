// Nihonggo Login Component
// Fitur: Login user/admin, simpan status login dan role ke localStorage
// Komponen utama: Login
// - handleSubmit: Proses login dan simpan data ke localStorage

"use client";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Ganti URL di bawah dengan endpoint login backend/database Anda
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login gagal. Cek email/password!");
      // Ambil data user (misal: {role: "admin"}) dari response
      const data = await res.json();
      // Simpan status login dan role ke localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('nihonggo_login', 'true');
        localStorage.setItem('nihonggo_role', data.role || 'user');
        localStorage.setItem('nihonggo_email', email);
      }
      alert("Login berhasil!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-2">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xs sm:max-w-sm flex flex-col gap-4 animate-pop-in">
        <h2 className="text-xl font-bold text-blue-700 mb-2 text-center">Login Akun</h2>
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-xs text-center">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow hover:from-purple-500 hover:to-blue-500 transition"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
        }
      `}</style>
    </div>
  );
};

export default Login;
